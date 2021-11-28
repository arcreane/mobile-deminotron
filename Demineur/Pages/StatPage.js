import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import ToTime from "../Components/ToTime";
import winrate from "../Components/winrate";
import { TouchableOpacity } from 'react-native-gesture-handler';


function StatPage(props) {
    
  let [Utilisateur, setUtilisateur] = useState("");
  let [UtilisateurId, setUtilisateurId] = useState(1);

  useEffect(() => {

    let mounted = true;
       
    fetch('https://hugocabaret.onthewifi.com/Deminotron/API/requetes/Utilisateur/GetInfo.php?id_utilisateur=' + UtilisateurId)
    .then((response) => response.json())
    .then((data) => { let stat = {
        "Winrate":winrate(89,15),"Partie_Gagnee": 15, "Parties_Perdues" : 89, "Temps_de_jeu": ToTime(8721),"Temps_Moyen_Par_Parties":ToTime(459)
    }
        if(mounted){
          setUtilisateur(stat)
        }
    }); 

    return () => mounted = false;
}, [UtilisateurId]);


        return (
          

            <View style={{position: 'absolute', top: 100}}>
                <Text>Statistiques :</Text>
                <Text style={{
                      marginRight:'auto',
                      marginTop:'3%',
                      marginLeft:'auto',
                      }}>Taux de victoire: {Utilisateur.Winrate}</Text>
                      <Text style={{
                      marginRight:'auto',
                      marginTop:'3%',
                      marginLeft:'auto',
                      }}>Parties gagnées: {Utilisateur.Partie_Gagnee}</Text>
                      <Text style={{
                      marginRight:'auto',
                      marginTop:'3%',
                      marginLeft:'auto',
                      }}>Parties perdues: {Utilisateur.Parties_Perdues}</Text>
                      <Text style={{
                      marginRight:'auto',
                      marginTop:'3%',
                      marginLeft:'auto',
                      }}>Temps moyen par parties: {Utilisateur.Temps_Moyen_Par_Parties}</Text>
                      <Text style={{
                      marginRight:'auto',
                      marginTop:'3%',
                      marginLeft:'auto',
                      }}>Temps de jeu total: {Utilisateur.Temps_de_jeu}</Text>
            </View>
        )
    }


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    image: {
        height: '100%',
      width: '100%',
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        marginLeft: 10,
        color: 'black',
      },
  })

  export default StatPage;