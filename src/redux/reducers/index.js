import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastr } from 'react-redux-toastr';

import scans from './scanReducer';
import users from './userReducer';

const rootReducer = combineReducers({
    toastr: toastr,
    routing: routerReducer,
    scans,
    users
});

export default rootReducer;