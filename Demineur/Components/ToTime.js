
function ToTime(secondes) {
    var nbheures=0;
    var nbminutes=0;
    
    var resultat = null;
    if (secondes>=3600){
        nbheures = ~~(secondes/3600);
        secondes = secondes%3600;
        nbminutes = ~~(secondes/60);
        secondes = secondes%60;
        resultat = nbheures+"h"+nbminutes+"m"+secondes+"s";
    }
    else if (secondes >= 60) {
        nbminutes = ~~(secondes/60);
        secondes = secondes%60;
        resultat = nbminutes+"m"+secondes+"s";
    }
    else{
        resultat = secondes;
    }
   
    
    return resultat;
}