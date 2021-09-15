import React from 'react';
import ScanList from './ScanList';
import {createScanData, createUserData} from './data'


class ScanContainer extends React.Component {

    state = {
        scans: createScanData(),
        users: createUserData(),
    };

    render() {
        return (
            <div>
                <ScanList
                    scans={this.state.scans}
                    users={this.state.users}
                />
            </div>
        );
    }
}

export default ScanContainer;
