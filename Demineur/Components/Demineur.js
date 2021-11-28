import React from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';



function Demineur(props) {

    let length = 10

    let [carre, setCarre] = useState("")
    let [forceUpdate, setForceUpdate] = useState(false)
    let [bombe, setBombe] = useState([0])

    let [nombreBombe, setNombreBombe] = useState(10)

    let [uncoveredCase, setUncoveredCase] = useState(0)

    let [boom, setBoom] = useState(false)

    //Affichage de la bombe en fonction de son état
    let Bombe = ({state, value}) => {
        //alert(typeof(bombe[0]))
        if(state == "NotClick"){
            return (
                <View></View>
            )
        }else{
            if(value != -1){
                return (
                    <View style={{height:20, width:20, backgroundColor:"#999",margin:5}}><Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>{value}</Text></View>
                )
            }else{
                return (
                    <View style={{height:20, width:20,borderRadius:100, margin:5}}>
                        <View style={{backgroundColor: 'red', height: 7, width: 7, borderRadius: 100, position: 'absolute', right: -1, top: 5}}></View>
                        <View style={{backgroundColor: 'yellow', height: 5, width: 5, borderRadius: 100, position: 'absolute', right: 0, top: 6}}></View>
                        <Image style={{transform: [{ rotate: '30deg' }],height: 20, width: 20, opacity: 0.6, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/BombeLogo.png')}/>
                    </View>
                )
            }
        }

    };

    //Affichage d'une seul case du démineur 
    let renderItemCarre = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>Boom(item[0])} style={{height:30, width:30, backgroundColor:"grey",margin:1}}>
                <Bombe state={item[1].state} value={item[1].value}/>
            </TouchableOpacity>
        )

    };
    // Si la valeur de la case est = -1 alors c'est une bombe, si elle est = 0 ca veut dire qu'il n'y aucune bombe autour, 
    // donc on apelle la fonction récursive, sinon on affiche le nombre de bombe autour
    function Boom(index){    
        //Déterminer le nombre de cases découvertes   
        setUncoveredCase(uncoveredCase + 1) 
        if(!boom){
            let tmpcarre = carre



            if(tmpcarre[index]['value'] == -1){
                setBoom(true)
                alert('BOOM !!!')
            }
            tmpcarre[index]['state'] = "Click"
            //RECURSION
            if(tmpcarre[index]['value'] == 0){
                recursiveBoom(tmpcarre, index)
            }
            
            setCarre(tmpcarre)
            //Forcer le rafraichissement du démineur
            setForceUpdate(true)
            return;
        }
    }

// Fonction récursive des nombres de bombes autour des cases cliqués
    function recursiveBoom(carre, index){
        
        bottomBoom(carre, index)

        leftBoom(carre, index)

        rightBoom(carre, index)

        topBoom(carre, index)

        rightTopBoom(carre, index)

        leftTopBoom(carre, index)

        leftBottomBoom(carre, index)

        rightBottomBoom(carre, index)
        
        return;
    }

    //On vérifie que la case cliquée n'est pas sur une extrimité sinon on active la fonction récursive

    function bottomBoom(carre, index){
        if(carre[index]['coordonates'].x != (length-1) && carre[(carre[index]['coordonates'].x+1) + ";" + (carre[index]['coordonates'].y)]['state'] != "Click"){
            Boom((carre[index]['coordonates'].x+1) + ";" + (carre[index]['coordonates'].y))
        }
        return;
    }

    function leftBoom(carre, index){
        if(carre[index]['coordonates'].y != 0 && carre[(carre[index]['coordonates'].x) + ";" + (carre[index]['coordonates'].y-1)]['state'] != "Click"){
            Boom((carre[index]['coordonates'].x) + ";" + (carre[index]['coordonates'].y-1))
        }
        return;
    }

    function topBoom(carre, index){
        if(carre[index]['coordonates'].x != 0 && carre[(carre[index]['coordonates'].x-1) + ";" + (carre[index]['coordonates'].y)]['state'] != "Click"){
            Boom((carre[index]['coordonates'].x-1) + ";" + (carre[index]['coordonates'].y))
        }
        return;
    }

    function rightBoom(carre, index){
        if(carre[index]['coordonates'].y != (length-1) && carre[(carre[index]['coordonates'].x) + ";" + (carre[index]['coordonates'].y+1)]['state'] != "Click"){
            Boom((carre[index]['coordonates'].x) + ";" + (carre[index]['coordonates'].y+1))
        }
        return;
    }

    function rightTopBoom(carre, index){
        if(carre[index]['coordonates'].y != (length-1) && carre[index]['coordonates'].x != 0 && carre[(carre[index]['coordonates'].x-1) + ";" + (carre[index]['coordonates'].y+1)]['state'] != "Click"){
            Boom((carre[index]['coordonates'].x-1) + ";" + (carre[index]['coordonates'].y+1))
        }
        return;
    }

    function leftTopBoom(carre, index){
        if(carre[index]['coordonates'].y != 0 && carre[index]['coordonates'].x != 0 && carre[(carre[index]['coordonates'].x-1) + ";" + (carre[index]['coordonates'].y-1)]['state'] != "Click"){
            Boom((carre[index]['coordonates'].x-1) + ";" + (carre[index]['coordonates'].y-1))
        }
        return;
    }

    function leftBottomBoom(carre, index){
        if(carre[index]['coordonates'].y != 0 && carre[index]['coordonates'].x != (length-1) && carre[(carre[index]['coordonates'].x+1) + ";" + (carre[index]['coordonates'].y-1)]['state'] != "Click"){
            Boom((carre[index]['coordonates'].x+1) + ";" + (carre[index]['coordonates'].y-1))
        }
        return;
    }

    function rightBottomBoom(carre, index){
        if(carre[index]['coordonates'].y != (length-1) && carre[index]['coordonates'].x != (length-1) && carre[(carre[index]['coordonates'].x+1) + ";" + (carre[index]['coordonates'].y+1)]['state'] != "Click"){
            Boom((carre[index]['coordonates'].x+1) + ";" + (carre[index]['coordonates'].y+1))
        }
        return;
    }
    //Lorsque toutes les cases sont découvertes on fait gagner le joueur
    useEffect(()=>{
        //alert(uncoveredCase)

        if((uncoveredCase + nombreBombe) == (length*length)){
            setBoom(true)
            alert('Bravo !!  vous avez découvert toutes les mines !!')
        }
    },[uncoveredCase])
    // Rechargement de la page, on relance une partie
    useEffect(()=>{
        loadGame()
    },[])

    //ON GENERE LES CASES EN FONCTION DES BOMBES
    useEffect(()=>{
        //ON GENERE LES CASES AVEC LEUR VALEUR
        let newCarre = {}
        for (let i=0;i<length;i++){
            for (let j=0;j<length;j++){
                let bombeValue = 0;
                if(bombe.indexOf(i.toString() + ";" + j.toString()) != -1){
                    bombeValue = -1
                }else{
                    if(bombe.indexOf((i-1).toString() + ";" + (j-1).toString()) != -1)
                        bombeValue++

                    if(bombe.indexOf((i).toString() + ";" + (j-1).toString()) != -1)
                        bombeValue++

                    if(bombe.indexOf((i+1).toString() + ";" + (j-1).toString()) != -1)
                        bombeValue++

                    if(bombe.indexOf((i-1).toString() + ";" + (j).toString()) != -1)
                        bombeValue++

                    if(bombe.indexOf((i+1).toString() + ";" + (j).toString()) != -1)
                        bombeValue++

                    if(bombe.indexOf((i-1).toString() + ";" + (j+1).toString()) != -1)
                        bombeValue++

                    if(bombe.indexOf((i).toString() + ";" + (j+1).toString()) != -1)
                        bombeValue++

                    if(bombe.indexOf((i+1).toString() + ";" + (j+1).toString()) != -1)
                        bombeValue++
                }

                newCarre[i+";"+j] = {state:"NotClick", value: bombeValue, identifier:j+(i*length), coordonates: {x:i, y:j}}
            }
        }
        setCarre(newCarre);

    },[bombe])

    useEffect(()=>{
        if(forceUpdate)
            setForceUpdate(false);
    },[forceUpdate])

    useEffect(()=>{
        loadGame()
    },[nombreBombe])
    //Affichage du démineur
    let Grille = () => {
        return(
                <FlatList extraData={forceUpdate} data={Object.entries(carre)} renderItem={renderItemCarre} keyExtractor = {item => item[0]} numColumns={length}/>
            )
    };


    function loadGame(){
        setBoom(false)

        //ON GENERE LES BOMBES
        let Bombes = []
        for (let i=0;i<nombreBombe;i++){
            do{
                newBombe = [parseInt(Math.floor(Math.random()*(length)),10).toString() + ";" + parseInt(Math.floor(Math.random()*(length)),10).toString()]
            } while (Bombes.indexOf(newBombe) != -1)

            Bombes = [...Bombes,...newBombe]
        }
        setBombe(Bombes)

        setForceUpdate(true)
    }
    //Affichage général du démineur
    return (
        <View>
            {/* Démineur */}
            <Grille></Grille>

            <TouchableOpacity onPress={() => loadGame()} style={{height: 50, width: 200, backgroundColor: 'white', borderRadius: 100, marginTop: 30, marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>Recommencer</Text>
            </TouchableOpacity>


            <View style={{marginTop: 30, marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row'}}>
                <Text style={{margin:4}}>Nombre de bombe : {nombreBombe}</Text>
                {/* <TextInput keyboardType="numeric" value={nombreBombe} onChangeText={setNombreBombe} placeholder={"Nombre de Bombe"}/> */}
            </View>
        {/* Selection du mode de jeu */}
            <View style={{margin: 0, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => setNombreBombe(10)} style={{height: 50, width: 80, backgroundColor: 'white', borderRadius: 100, marginTop: 30, marginLeft: 'auto', marginRight: 'auto'}}>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>Easy</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setNombreBombe(20)} style={{height: 50, width: 80, backgroundColor: 'white', borderRadius: 100, marginTop: 30, marginLeft: 'auto', marginRight: 'auto'}}>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>Normal</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setNombreBombe(30)} style={{height: 50, width: 80, backgroundColor: 'white', borderRadius: 100, marginTop: 30, marginLeft: 'auto', marginRight: 'auto'}}>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>Hard</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({

    containerGrille: {
        backgroundColor: 'grey',
        borderBottomLeftRadius: 19,
        borderBottomRightRadius: 19,
        paddingTop: 33,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5,
    },

})


export default Demineur