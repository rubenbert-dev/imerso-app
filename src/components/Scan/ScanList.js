import React, { Component } from "react";
import PropTypes from 'prop-types';
import RenderIf from 'render-if';
import { Link } from 'react-router';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './ScanList.css';

class ScanList extends Component {
  render() {
    const { scans, handleSorting, onSearch } = this.props

    return (
      <div className="scan-list-page">
        <Card bg="light">
          <Card.Header as="h5">
            <Nav>
              <Nav.Item>
                <Nav.Link disabled>Scans</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Header>
            <Row className="justify-content-between">
              <Col sm={6} md={6}>
                <Link to="/scan/create" className="btn btn-primary create-scan-btn">
                  <i className="fa fa-fw fa-plus"></i> Add Scan
                </Link>
              </Col>
              <Col sm={6} md={6}>
                <Form.Control type="text" 
                  placeholder="Search scans . . ."
                  onChange={onSearch}/>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body style={{padding: 0}}>
            <Table className="scans-tabular-list mb-0" hover striped responsive>
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th className="sortable justify-content-between" 
                    data-key="name" 
                    onClick={handleSorting}>Scan
                    <span className="asc"><i className="fa fa-fw fa-caret-up"></i></span>
                    <span className="desc"><i className="fa fa-fw fa-caret-down"></i></span>
                  </th>
                  <th className="sortable" 
                    data-key="username" 
                    onClick={handleSorting}>Scanned by
                    <span className="asc"><i className="fa fa-fw fa-caret-up"></i></span>
                    <span className="desc"><i className="fa fa-fw fa-caret-down"></i></span>
                  </th>
                  <th className="sortable" 
                    data-key="elevationMin" 
                    onClick={handleSorting}>Min. Elevation
                    <span className="asc"><i className="fa fa-fw fa-caret-up"></i></span>
                    <span className="desc"><i className="fa fa-fw fa-caret-down"></i></span>
                  </th>
                  <th className="sortable" 
                    data-key="elevationMax" 
                    onClick={handleSorting}>Max. Elevation
                    <span className="asc"><i className="fa fa-fw fa-caret-up"></i></span>
                    <span className="desc"><i className="fa fa-fw fa-caret-down"></i></span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, i) => {
                  return (
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{scan.name}</td>
                      <td>{scan.username}</td>
                      <td className="text-right">{parseFloat(scan.elevationMin).toFixed(2)}</td>
                      <td className="text-right">{parseFloat(scan.elevationMax).toFixed(2)}</td>
                      <td>
                        <Link to={`/scan/update/${scan.id}`} className="btn btn-primary btn-sm">
                          <i className="fa fa-fw fa-edit"></i> Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {RenderIf(scans.length === 0)(
                <tfoot>
                  <tr><td colSpan={6}>No result(s) found.</td></tr>
                </tfoot>
              )}
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

ScanList.defaultProps = {
  scans: [],
  handleSorting: () => {},
  onSearch: () => {}
}

ScanList.propTypes = {
  scans: PropTypes.array.isRequired,
  handleSorting: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default ScanList;
