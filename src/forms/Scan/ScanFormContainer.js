import React, { Component } from 'react';
import { connect } from 'react-redux';

import { scanEdit, scanCreate, scanUpdate, getScanList, onSaveScan, onScanEdit, scanEditUnmount } from '../../redux/actions/scanAction';
import { createScanData, createUserData } from '../../redux/data';
import ScanForm from './ScanForm';
import { getUserList } from '../../redux/actions/userAction';
import scanRepository from '../../services/repositories/scanRepository';

class ScanFormContainer extends Component
{
  constructor(props) {
    super(props);

    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.handleFormSelectChange = this.handleFormSelectChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const { scans, users, params, dispatch } = this.props
    const { action, id } = params

    if (id !== undefined && action === "update")
      this.setEditScanData(id); // dispatch(onScanEdit(id));
    else
      this.setCreateScanData();

    if (scans.list.data.length === 0)
      dispatch( getScanList( scanRepository.getScanWithUserData(createScanData()) ) );

    if (users.list.data.length === 0)
      dispatch(getUserList(createUserData()));
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(scanEditUnmount());
  }

  setCreateScanData() {
    const { dispatch } = this.props
    dispatch(scanCreate());
  }

  setEditScanData(id) {
    const { dispatch, scans } = this.props
    const { list } = scans
    let _data = list.data,
        scanData = {}

    if (_data.length === 0) {
      dispatch(onScanEdit(id));
    } else {
      scanData = _data.find(scan => scan.id === parseInt(id));
      dispatch(scanEdit({ id: id, data: scanData }));
    }
  }

  getActionLabel() {
    const { params } = this.props
    let actionLabel = params.action

    if (!actionLabel || actionLabel === undefined)
      return null;

    return actionLabel.toString().charAt(0).toUpperCase() + actionLabel.toString().slice(1);
  }

  handleFormInputChange(ev) {
    const { dispatch, scans } = this.props
    const { selected } = scans
    let target = ev.currentTarget,
        name = target.name,
        value = target.value,
        scan = selected

    if (Object.keys(scan).includes(name))
      scan[name] = value

    dispatch(scanUpdate(scan));
  }

  handleFormSelectChange(data) {
    const { dispatch, scans, users } = this.props
    const { selected } = scans
    const { value, field } = data
    let scan = selected

    if (Object.keys(scan).includes(field))
      scan[field] = value

    scan = scanRepository.scanData(scan, users.list.data);
    dispatch(scanUpdate(scan));
  }

  handleFormSubmit(ev) {
    ev.preventDefault();

    const { dispatch, params, scans } = this.props;
    const { action, id } = params
    const { selected, list } = scans;
    let scansData = list.data,
        selectedScan = selected,
        scanCount = scansData.length,
        newId = null;

    if (id !== undefined && action === "update") {
      scansData = scansData.map(scan => {
        if (scan.id === parseInt(id)) {
          return selectedScan;
        }

        return scan;
      })
    } else {
      newId = scanCount + 1;
      selectedScan = {
        ...selectedScan,
        id: newId
      }

      scansData.push(selectedScan);
    }

    dispatch(onSaveScan(scansData));

    if (action === "create") {
      dispatch(scanEdit({ id: newId, data: selectedScan }));
      this.props.router.push(`/scan/update/${newId}`);
    }
  }

  render() {
    const { scans, users } = this.props
    const { selected, is_saving } = scans
    let scan = selected,
        user = users.list.data.find(u => ((scan && scan.scannedByUserId !== null) && (u.id === scan.scannedByUserId)));

    return (
      <section>
        <ScanForm actionTitle={this.getActionLabel()} 
          scan={scan} 
          user={user}
          users={users}
          isSaving={is_saving}
          onChange={this.handleFormInputChange}
          onSelectChange={this.handleFormSelectChange}
          onSubmit={this.handleFormSubmit} />
      </section>
    )
  }
}

const mapStateToProps = state => ({
  scans: state.scans,
  users: state.users
});
const connScanFormContainer = connect(mapStateToProps)(ScanFormContainer);

export { connScanFormContainer as ScanFormContainer }