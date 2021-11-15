import React from 'react';
import { useEffect, useState } from 'react';
import {Text, View, Image} from 'react-native';

function ProfilPage(props) {

  let [Utilisateur, setUtilisateur] = useState("");
  let [UtilisateurId, setUtilisateurId] = useState(1);

    useEffect(() => {

        let mounted = true;
           
        fetch('https://hugocabaret.onthewifi.com/Deminotron/API/requetes/Utilisateur/GetInfo.php?id_utilisateur=' + UtilisateurId)
        .then((response) => response.json())
        .then((data) => {
            if(mounted){
              setUtilisateur(data)
            }
        }); 
    
        return () => mounted = false;
    }, [UtilisateurId]);
    
    return (

        <View style={{position: 'absolute', 
                      top: '15%',
                      width: '100%'
                      }}>
            
            <Image style={{height: 100, 
                          width: 100, 
                          marginTop: '5%',
                          marginLeft:'auto',
                          marginRight:'auto',
                          opacity: 0.6,
                          backgroundColor: 'rgba(255, 255, 255, 0)',
                          borderRadius: 50 }} source={{uri: Utilisateur.image}}/>

            <Text style={{
                      marginRight:'auto',
                      marginTop:'3%',
                      marginLeft:'auto',
                      }}>{Utilisateur.pseudo}</Text>

    <View style={{flexDirection:'row', marginTop:'15%',}}>
                  <Text style={{
                    marginLeft:'5%',
                    
                  }}>Informations Personelles</Text>

      <Text style={{
                    marginLeft:'30%',
                    color:'blue',
                  }}>Modifer</Text>
                  </View>
                  

                  <Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                  }}>Nom :</Text>

                  <Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                  }}>Prénom :</Text>

<Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                  }}>Date de Naissance :</Text>

<Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                  }}>E-mail :</Text>

              </View> 
    )
}

export default ProfilPage;