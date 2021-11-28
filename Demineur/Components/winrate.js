export default function WinRate(nbparties , nbvictoires){
    //on crée un winrate en fonction de deux nombres en limitant les virgules
     moyenne =nbparties/nbvictoires;
     let res = moyenne.toFixed(2);
    return res;
}