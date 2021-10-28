import React from 'react';
import {Text, View, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfilPage(props) {
    
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
                          backgroundColor: 'rgba(255, 255, 255, 0)'}} source={require('../Images/ProfilLogo.png')}/>

            <Text style={{
                      marginRight:'auto',
                      marginTop:'3%',
                      marginLeft:'auto',
                      fontSize:'25%'
                      }}>[insérer pseudo joueur]</Text>

    <View style={{flexDirection:'row', marginTop:'15%',}}>
                  <Text style={{
                    marginLeft:'5%',
                    
                    fontSize:'15%',
                  }}>Informations Personelles</Text>

      <Text style={{
                    marginLeft:'30%',
                    fontSize:'15%',
                    color:'blue',
                    fontStyle:'italic',
                  }}>Modifer</Text>
                  </View>
                  

                  <Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                    fontSize:'15%',
                  }}>Nom :</Text>

                  <Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                    fontSize:'15%',
                  }}>Prénom :</Text>

<Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                    fontSize:'15%',
                  }}>Pseudo :</Text>

<Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                    fontSize:'15%',
                  }}>Date de Naissance :</Text>

<Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                    fontSize:'15%',
                  }}>E-mail :</Text>

<Text style={{
                    marginLeft:'5%',
                    marginTop:'5%',
                    fontSize:'15%',
                  }}>Mot de Passe :</Text>

              </View> 
    )
}


    



async function getValue(){
  var _resultId = await SecureStore.getItemAsync('UtilisateurId')
  if(_resultId){
      setUtilisateurId(_resultId)
  }else{
      setUtilisateurId("")
  }
} //Récupération de l'ID de la personne connecté pour accéder à son profil


export default ProfilPage;