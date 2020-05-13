export default function euclidDist(pos1,pos2){
    return Math.sqrt(Math.pow(pos1.lat - pos2.lat,2) + Math.pow(pos1.lng - pos2.lng,2));
}
