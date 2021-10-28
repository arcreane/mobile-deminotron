import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";

import Pokes from "../Components/PokesView"
import DescribMe from "../Components/DescribMeView"
import EmotionsView from '../Components/EmotionsView';
import CGU from '../CGU.js';
import { ScrollView } from 'react-native-gesture-handler';

export default function ChangeProfilPage(props) {

    var { profilId } = ""
    try {
        profilId = props.route.params._profilId;
    } catch (error) {
        profilId = props.profilId;
    }

    var [utilisateurId, setUtilisateurId] = useState("");
    var [photo, setPhoto] = useState("");
    var [affinite, setAffinite] = useState(0);
    var [state, setState] = useState(true);
    var [_height, set_Height] = useState(100);


    var [pseudo, setPseudo] = useState("");


    const cgu = CGU;



    async function getValue(utilisateurId){
        var _resultMail = await SecureStore.getItemAsync(utilisateurId)
        if(_resultMail){
            setUtilisateurId(_resultMail)
        }
    }

    getValue('UtilisateurId')


    useEffect(() => {
        let mounted = true;

        fetch('https://hugocabaret.onthewifi.com/TalkAndPoke/API/requetes/Utilisateur/GetUtilisateur.php?UtilisateurId=' + utilisateurId)
        .then((response) => response.json())
        .then((data) => {
            if(mounted)
                setPhoto(data)
        });

        return () => mounted = false;

    }, [utilisateurId]);


    function deconnexion(){
        SecureStore.deleteItemAsync('UtilisateurMail')
        SecureStore.deleteItemAsync('UtilisateurPassword')
        SecureStore.deleteItemAsync('UtilisateurId')
        props.navigation.navigate('ConnexionPage')
    }
    function DeleteCompte(){
        //alert(utilisateurId)
        fetch('https://hugocabaret.onthewifi.com/TalkAndPoke/API/requetes/Utilisateur/DeleteUtilisateur.php?UtilisateurId=' + utilisateurId)
        .then(alert('votre compte a bien été supprimé'))
        deconnexion()
    }

    async function selectImage(){
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            base64: true,
          }).then(alert('il faut parfois attendre quelques minutes avant que l\'image soit uploadée aux serveur, merci d\'être patien : )'))

        setState({
            imageSource: _image.uri,
            data: _image.data
        });
        
        setPhoto({Image : _image.uri});

        let data = new FormData();
            data.append('pseudo', photo.Pseudo); // you can append anyone.
            
            data.append('photo', {
                uri: _image.uri,
                type: 'image/png', // or photo.type
                name: 'image'
            });

        fetch('https://hugocabaret.onthewifi.com/TalkAndPoke/API/requetes/AddImage.php', {
                method: 'POST',
                body: data,
                type: 'image/jpeg',
                header: {
                    'content-type': 'multipart/form-data',
                },
            })

        fetch('https://hugocabaret.onthewifi.com/TalkAndPoke/API/requetes/Utilisateur/UpdateImage.php?UtilisateurId=' + utilisateurId + '&Image=https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/' + photo.Pseudo + '.png')
    }

    var ImageProfil = () => {
        if(profilId == utilisateurId){
            return(
                <TouchableOpacity onPress={() => selectImage()}>
                    <View style={{marginTop: 0}}>
                        
                        <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 50}}>
                            <Image style={{height: 100, width: 100, borderRadius: 100}} source={{uri: photo.Image}}/>
                            <TouchableOpacity style={{position: 'absolute', top: -10, right: -10}} onPress={() => alert('bientot')}>
                                    <LinearGradient colors={['rgb(254, 165, 42)', 'rgbrgb(254, 165, 42)']}start={{x: 0, y: 1}} end={{x: 1, y: -1}} style={{height: 40, width: 40, borderRadius: 100, alignSelf: 'flex-end'}}>
                                        <Image style={{height: 20, width: 20, top: 10, left: 10, backgroundColor: 'transparent'}} source={{uri: 'https://www.shareicon.net/data/256x256/2017/02/09/878618_edit_512x512.png'}}/>
                                    </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', fontSize: 20}}>{photo.Pseudo}</Text>
                    </View>
                </TouchableOpacity>
            )
            
        }else{
            return(
                <View style={{marginTop: 0}}>
                    <Image style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 50, height: 100, width: 100, borderRadius: 100}} source={{uri: photo.Image}}/>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', fontSize: 20}}>{photo.Pseudo}</Text>
                </View>
            )
        }
    };

    var Deconnexion = () => {
        return(
            <View style={{marginTop: 50, marginBottom: 80}}>
                <TouchableOpacity style={{marginTop: 20, borderRadius: 100,paddingHorizontal: 20, paddingVertical: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',}} onPress={() => alert(cgu)}>
                    <Text style={{textDecorationLine: 'underline'}}>Conditions générales d'utilisation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20, backgroundColor: 'white', elevation: 5, borderRadius: 100,paddingHorizontal: 20, paddingVertical: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',}} onPress={() => DeleteCompte()}>
                    <Text>Supprimer mon compte</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20, backgroundColor: 'white', elevation: 5, borderRadius: 100,paddingHorizontal: 20, paddingVertical: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',}} onPress={() => deconnexion()}>
                    <Text>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        )
    };

    var BackArrow = () => {
        if(profilId != utilisateurId){
            return(
                <View style={{flexDirection: 'row', height: 100}}>
                    <TouchableOpacity style={{position: 'absolute', left: 20, bottom: 0}} onPress={() => props.navigation.pop()}>
                        <View style={{height: 50, width: 50, borderRadius: 100, alignSelf: 'flex-end', backgroundColor: 'rgb(254, 165, 42)'}}>
                            <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
            
        }else{
            return(
                <View>
                </View>
            )
        }
    };

    return(
        <ScrollView>
            <BackArrow/>
            <ImageProfil/>


            <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <View style={{height: 60, marginTop: 20, width: 300, backgroundColor: 'white', borderRadius: 100}}>
                    <TextInput style={{marginBottom: 'auto', marginTop: 'auto', marginLeft: 30}} value={pseudo} onChangeText={setPseudo} placeholder={"Change pseudo"}/>
                
                    <TouchableOpacity onPress={() => alert('save')} style={{backgroundColor: 'rgb(254, 165, 42)', width: 80, height: 50, position: 'absolute', right: 0, borderRadius: 100, margin: 5}}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Save</Text>
                    </TouchableOpacity>

                </View>
            </View>


            <Deconnexion/>
        </ScrollView>
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