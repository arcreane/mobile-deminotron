import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';



function Demineur(props) {

    var length = 10
    var nombreBombe = 10

    var [carre, setCarre] = useState("")
    var [forceUpdate, setForceUpdate] = useState(false)
    var [bombe, setBombe] = useState([0])


    var Bombe = ({state,index}) => {
        //alert(typeof(bombe[0]))
        if(state!="boom"){
            return (
                <View></View>
            )
        }else{
            if(bombe.indexOf(index) == -1){
                return (
                    <View style={{height:20, width:20, backgroundColor:"#333",margin:5}}></View>
                )
            }else{
                return (
                    <View style={{height:20, width:20,borderRadius:100, backgroundColor:"red",margin:5}}></View>
                )
            }
        }
        
    };

    var renderItemCarre = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>Boom(item.identifier)} style={{height:30, width:30, backgroundColor:"grey",margin:1}}>
                <Bombe state={item.state} index={item.identifier}/>
            </TouchableOpacity> 
        )
               
    };

    function Boom(index){
        var tmpcarre = carre
        
        tmpcarre[index].state = "boom"
        //tmpcarre = [...tmpcarre,...[{state:"boom", identifier:101}]]
        setCarre(tmpcarre)
        setForceUpdate(true)
        //alert(JSON.stringify(tmpcarre))
    }
    
    useEffect(()=>{
        let newBombe = []
        for (var i=0;i<nombreBombe;i++){
            newBombe = [...newBombe,...[parseInt(Math.floor(Math.random()*(length*length)),10)]]
        }

        setBombe(newBombe)

        let newState = []
        for (var i=0;i<length;i++){
            for (var j=0;j<length;j++){
                newState = [...newState,...[{state:"safe", identifier:j+(i*10)}]]
            }
        }
        setCarre(newState);
    },[])

    useEffect(()=>{
        if(forceUpdate)
            setForceUpdate(false);
    },[forceUpdate])

    var Grille = () => {
        return(
                <FlatList extraData={forceUpdate} data={carre} renderItem={renderItemCarre} keyExtractor = {item => item.identifier} numColumns="10"/>
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