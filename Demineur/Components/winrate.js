export default function WinRate(nbparties , nbvictoires){
     moyenne =nbparties/nbvictoires;
     let res = moyenne.toFixed(2);
    return res;
}