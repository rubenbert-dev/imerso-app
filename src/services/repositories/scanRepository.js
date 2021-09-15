import { createScanData, createUserData } from "../../redux/data";

const scanRepository = {
    scanData: (scan, users) => scanData(scan, users),
    getScanWithUserData: (scan, user) => scanWithUserData(scan, user)
}

function scanData(scan, users) {
    let user = users.find(u => u.id === scan.scannedByUserId);
    return {
        ...scan,
        username: (user && user.name)?user.name:''
    }
}

function scanWithUserData(scan, user) {
    let scanData = createScanData(),
        userData = createUserData();

    if (scan !== undefined && scan !== null) {
        scanData = scan;
    }

    if (user !== undefined && user !== null) {
        userData = user;
    }

    return scanData.map(scan => {
        return scanRepository.scanData(scan, userData);
    });
}

export default scanRepository;