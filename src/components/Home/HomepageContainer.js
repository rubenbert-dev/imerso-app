import React, { Component } from "react";
import { connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../../assets/css/App.css';
import { ScanContainer } from "../Scan/ScanContainer";
import { Header } from "../common/Header";
import { ScanFormContainer } from "../../forms/Scan/ScanFormContainer";

class Homepage extends Component {
  render() {
    return (
      <div className="app">
        <Container>
          <Row className="">
            <Col md={{ span: 10, offset: 1 }}>
              <Header />
              <Router history={browserHistory} path="/" component={ScanContainer}>
                {/* <Route path="/scan/:action/:id?" component={ScanFormContainer} /> */}
                <Route name="Scan Form" path="scan" component={ScanFormContainer}>
                    <Route name=":action" path=":action" component={ScanFormContainer}>
                        <Route path=":id" component={ScanFormContainer} />
                    </Route>
                </Route>
                <Route path="*" component={ScanContainer} />

                  {/* <Route name="Scan Form" path="/scan/:action/:id?" component={ScanFormContainer} />
                  <Route name="Scans" path="*" component={ScanContainer} /> */}
              </Router>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Homepage);
