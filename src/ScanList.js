import React from 'react';
import './ScanList.css'


class ScanList extends React.Component {

    render() {
        return (
            <div>
                <div className="Header">
                    Scans:
                </div>
                <div className="ScanList">
                    {this.props.scans.map((scan, i) => {
                        const user = this.props.users.find(u => u.id === scan.scannedByUserId);
                        return (
                            <div
                                className="ScanListItem"
                                key={i}
                            >
                                {scan.name}
                                <div className="UserName">
                                    by {user.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ScanList;
