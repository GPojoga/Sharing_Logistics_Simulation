export default function avg(array){
    return array.reduce((accumulator,current) => accumulator + current)/array.length;
}