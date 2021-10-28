import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';



function Demineur(props) {

    var length = 10
    var nombreBombe = 10

    var [carre, setCarre] = useState("")
    var [bombe, setBombe] = useState("")

    var renderItemCarre = ({item}) => {
        if(item.state!=="boom"){
            return (
                <TouchableOpacity onPress={()=>Boom(item.identifier)} style={{height:30, width:30, backgroundColor:"grey",margin:1}}></TouchableOpacity>
            )
        }else{
            return (
                <View style={{height:30, width:30, backgroundColor:"grey",margin:1}}>
                    <View style={{height:20, width:20,borderRadius:100, backgroundColor:"red",margin:5}}><Text>{item.identifier}</Text></View>
                </View>
            )
        }
        
    };

    function Boom(index){
        var tmpcarre = carre
        
        tmpcarre[index].state = "boom"
        setCarre(tmpcarre)
        alert(JSON.stringify(tmpcarre))
    }

    useEffect(()=>{
        let newBombe = []
        for (var i=0;i<nombreBombe;i++){
            newBombe = [...newBombe,...[Math.floor(Math.random()*(length*length)),]]
        }

        alert(JSON.stringify(newBombe))

        let newState = []
        for (var i=0;i<length;i++){
            for (var j=0;j<length;j++){
                newState = [...newState,...[{state:"safe", identifier:j+(i*10)}]]
            }
        }
        setCarre(newState);
    },[])

    var Grille = () => {
        return(
                <FlatList data={carre} renderItem={renderItemCarre} keyExtractor = {item => item.identifier} numColumns="10"/>
            )
    };

   
    return (
        <View>
            <Grille></Grille>
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