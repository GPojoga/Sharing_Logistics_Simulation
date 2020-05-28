export default function haversine(a,b){
    let toRad = function(a){return a*Math.PI/180};
    let R = 6371e3; // metres
    let lat1 = toRad(a.lat);
    let lat2 = toRad(b.lat);

    const deltaLat = toRad(a.lat-b.lat);
    const deltaLng = toRad(a.lng-b.lng);

    const d = Math.pow(Math.sin(deltaLat/2),2 )+
        Math.cos(lat1) * Math.cos(lat2) *
        Math.pow(Math.sin(deltaLng/2),2);
    const c = 2 * Math.asin(Math.sqrt(d));

    return R * c; // in meters
}