import React, { Component } from "react";
import RenderIf from 'render-if';
import { Link } from 'react-router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Select from 'react-select';
import userRepository from "../../services/repositories/userRepository";
import LoadingButton from "../../components/common/LoadingButton";
// import CreatableSelect from 'react-select/lib/Creatable';

class ScanForm extends Component {
  render() {
    const {
      actionTitle, 
      scan, 
      user, 
      users, 
      isSaving, 
      onChange, 
      onSelectChange, 
      onSubmit
    } = this.props

    return (
      <div className="scan-form-page">
        <Card>
          <Card.Header>
            <Row className="justify-content-between mx-0">
              <Nav as="h5">
                <Nav.Item>
                  <Nav.Link as={Link} to="/">
                    <i className="fa fa-chevron-left"></i>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled>{`${actionTitle} Scan`}</Nav.Link>
                </Nav.Item>
              </Nav>
              {RenderIf(scan && scan.id !== null && !isSaving)(<a href="/scan/create" className="btn btn-primary btn-sm">Add Scan</a>)}
            </Row>
            {/* <Nav>
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  <i className="fa fa-chevron-left"></i>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link disabled>{`${actionTitle} Scan`}</Nav.Link>
              </Nav.Item>
            </Nav> */}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <Form onSubmit={onSubmit}>
                  <Form.Group as={Row} controlId="formHorizontalScanName">
                    <Form.Label column sm={5}>
                      Name
                    </Form.Label>
                    <Col sm={7}>
                      <Form.Control type="text" 
                        name="name"
                        placeholder="Name" 
                        value={(scan && scan.name)?scan.name:''}
                        disabled={isSaving}
                        onChange={onChange}
                        required />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalMinElevation">
                    <Form.Label column={5}>Min. Elevation</Form.Label>
                    <Col sm={7}>
                      <Form.Control type="number" 
                        name="elevationMin"
                        step="any" 
                        placeholder="0.00" 
                        value={(scan && scan.elevationMin)?scan.elevationMin:''}
                        disabled={isSaving}
                        onChange={onChange}
                        required />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalMaxElevation">
                    <Form.Label column={5}>Max. Elevation</Form.Label>
                    <Col sm={7}>
                      <Form.Control type="number" 
                        name="elevationMax"
                        step="any" 
                        placeholder="0.00" 
                        value={(scan && scan.elevationMax)?scan.elevationMax:''}
                        disabled={isSaving}
                        onChange={onChange}
                        required />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalUsername">
                    <Form.Label column={5}>User</Form.Label>
                    <Col sm={7}>
                      <Select name="username"
                        placeholder="Select User"
                        value={(user === null || Object.keys(user).length === 0) ? '' : userRepository.createSelectOption(user.name, user.id, user)}
                        isDisabled={isSaving}
                        options={(users && users.list.data.length > 0)
                          ? users.list.data.map(u => userRepository.createSelectOption(u.name, u.id, {...u, field: "scannedByUserId"}) )
                          : []
                        }
                        onChange={onSelectChange} />
                      {/* <Form.Control type="text" 
                        name="username"
                        placeholder="Username" 
                        value={(scan && scan.username)?scan.username:''}
                        onChange={onChange} /> */}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 7, offset: 5 }}>
                      <LoadingButton type="submit" 
                        text="Saving . . ." 
                        loading={isSaving} 
                        disabled={isSaving}>Save</LoadingButton>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

ScanForm.defaultProps = {
  actionTitle: 'Create',
  scan: {},
  user: {},
  users: [],
  isSaving: false,
  onChange: () => {},
  onSelectChange: () => {},
  onSubmit: () => {}
}

export default ScanForm;