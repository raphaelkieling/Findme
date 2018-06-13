const JWT_SECRET = process.env.JWT_SECRET;

const CalcDistanceBetweenInKM = (lat1, lon1, lat2, lon2) => {
    var R = 6371; //radiano da terra
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
}

function toRad(Value) {
    return Value * Math.PI / 180;
}


module.exports = {
    JWT_SECRET,
    CalcDistanceBetweenInKM
}