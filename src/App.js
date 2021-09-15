import React, { Component } from "react";
import { connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './assets/css/App.css';
import { ScanContainer } from "./components/Scan/ScanContainer";
import { Header } from "./components/common/Header";
import { ScanFormContainer } from "./forms/Scan/ScanFormContainer";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Container>
          <Row className="">
            <Col md={{ span: 10, offset: 1 }}>
              <Header />
              <Router history={browserHistory} path="/" component={ScanContainer}>
                {/* <Route exact path="/" component={ScanContainer} /> */}
                <Route name="Scans" path="/" component={ScanContainer}>

                  <Route name="Scans" path="*" component={ScanContainer} />
                  <Route name="Scan Form" path="scan/:action/:id?" component={ScanFormContainer} />
                </Route>>
              </Router>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(App);
