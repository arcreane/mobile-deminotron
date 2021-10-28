import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

function NavBarre(props) {

        var [photo, setPhoto] = useState("");
        var [utilisateurId, setUtilisateurId] = useState("");


        async function getValue(utilisateurId){
            var _resultMail = await SecureStore.getItemAsync(utilisateurId)
            if(_resultMail){
                setUtilisateurId(_resultMail)
            }
        }

        getValue('UtilisateurId')

        //Charger la photo de L'utilisateur
        useEffect(() => {


            fetch('https://hugocabaret.onthewifi.com/TalkAndPoke/API/requetes/Utilisateur/GetUtilisateur.php?UtilisateurId=' + utilisateurId)
            .then((response) => response.json())
            .then((data) => setPhoto(data));


        }, [utilisateurId]);


        return (

            <View style={styles.containerNavBarre}>
                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('MainPage')}>
                    <Image style={{height: 40, width: 40, opacity: 0.6, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/StatLogo.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('MainPage', {_page: "swipe"})}>
                    <Image style={{transform: [{ rotate: '30deg' }],height: 40, width: 42, opacity: 0.6, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/BombeLogo.png')}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('MainPage', {_page: "menu"})}>
                    <Image style={{height: 40, width: 40, opacity: 0.6, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/ShopLogo.png')}/>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('MainPage', {_page: "profil"})}>
                    <Image style={{height: 40, width: 40, borderRadius: 100, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={{uri: photo.Image}}/>
                </TouchableOpacity>
            </View>

        )
}

const styles = StyleSheet.create({
    containerNavBarre: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopRightRadius: 19,
        borderTopLeftRadius: 19,
        elevation: 5,
    },
})


export default NavBarre