import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';

import configureStore from './redux/configureStore';

import HomepageContainer from './components/Home/HomepageContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const store = configureStore;
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        {/* <ConnectedRouter history={history}>
        <App />
        </ConnectedRouter> */}
        <div>
            <Router history={history} path='/' component={HomepageContainer}>
                <Route path="*" name="Scan List Application" component={HomepageContainer}/>
            </Router>
            <ReduxToastr preventDuplicates position="bottom-right"/>
        </div>
    </Provider>,
    document.getElementById('root')
);

