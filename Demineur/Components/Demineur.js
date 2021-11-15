import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';



function Demineur(props) {

    let length = 10
    let nombreBombe = 10

    let [carre, setCarre] = useState("")
    let [forceUpdate, setForceUpdate] = useState(false)
    let [bombe, setBombe] = useState([0])

    let [boom, setBoom] = useState(false)


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
                    <View style={{height:20, width:20,borderRadius:100, backgroundColor:"red",margin:5}}></View>
                )
            }
        }

    };


    let renderItemCarre = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>Boom(item[0])} style={{height:30, width:30, backgroundColor:"grey",margin:1}}>
                <Bombe state={item[1].state} value={item[1].value}/>
            </TouchableOpacity>
        )

    };

    function Boom(index){
        //alert(index)
        
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
            setForceUpdate(true)
            return;
            //alert(JSON.stringify(tmpcarre))
        }
    }


    function recursiveBoom(carre, index){
        
        bottomBoom(carre, index)

        leftBoom(carre, index)

        rightBoom(carre, index)

        topBoom(carre, index)
        
        return;
    }

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


    return (
        <View>
            <Grille></Grille>

            <TouchableOpacity onPress={() => loadGame()} style={{height: 50, width: 200, backgroundColor: 'white', borderRadius: 100, marginTop: 30, marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>Recommencer</Text>
            </TouchableOpacity>
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