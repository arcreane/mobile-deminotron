import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import TopBarre from '../Components/TopBarre';
import DemineurPage from '../Pages/DemineurPage';
import ShopPage from '../Pages/ShopPage';
import StatPage from '../Pages/StatPage';
import ProfilPage from '../Pages/ProfilPage';

function MainPage({ navigation, route }) {

   // Première page à charger
    var toLoad = "demineur"

    var [utilisateurId, setUtilisateurId] = useState("");
    var [demineur, setDemineur] = useState(true);
    var [stat, setStat] = useState(false);
    var [shop, setShop] = useState(false);
    var [profil, setProfil] = useState(false);
    // Permet de charger la page demandée
    // La fonction useEffect est appelée à chaque fois que la variable toLoad change
    useEffect(() => {
        if(toLoad == "demineur"){
            LoadDemineur()
        }
        else if(toLoad == "shop"){
            LoadShop()
        }
        else if(toLoad == "stat"){
            LoadStat()
            
        }else if(toLoad == "profil"){
            LoadProfil()
        }
    }, [toLoad])
    

    // Structure de la single page
    var Content = () => {
        if(demineur){
            return(
                <DemineurPage navigation={navigation}></DemineurPage>
            );
        }
        else if(shop){
            return(
                <ShopPage navigation={navigation}></ShopPage>
            );
        }
        else if(stat){
            return(
                <StatPage navigation={navigation}></StatPage>
            );
        }else if(profil){
            return(
                <ProfilPage/>
            );
        }else{
            return(
                <View></View>
            )
        }

        
    }
        // Affichage global de l'application
        return (
            <View>

                <View style={styles.container}>
                    <TopBarre navigation={navigation}/>
                </View>

                <Content/>  
            {/* navbar  */}
                <View style={styles.containerNavBarre}>
                    <TouchableOpacity activeOpacity={1} onPress={() => LoadShop()}>
                        <Image style={{height: 40, width: 40, opacity: 0.6, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/ShopLogo.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => LoadDemineur()}>
                        <Image style={{transform: [{ rotate: '30deg' }],height: 40, width: 42, opacity: 0.6, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/BombeLogo.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => LoadStat()}>
                        <Image style={{height: 40, width: 40, opacity: 0.6, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/StatLogo.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => LoadProfil()}>
                        <Image style={{height: 40, width: 40, opacity: 0.6, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/ProfilLogo.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            
    
        )

        function LoadShop(){
            setShop(true)
            setDemineur(false)
            setStat(false)
            setProfil(false)
        }

        function LoadDemineur(){
            setShop(false)
            setDemineur(true)
            setStat(false)
            setProfil(false)
        }
        function LoadStat(){
            setShop(false)
            setDemineur(false)
            setStat(true)
            setProfil(false)
        }

        function LoadProfil(){
            setShop(false)
            setDemineur(false)
            setStat(false)
            setProfil(true)
        }
    }


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: '#eee',
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
        elevation: 8,
    },
    containerAffiches: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
  })

  export default MainPage;

