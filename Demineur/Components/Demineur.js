import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';



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
        alert(JSON.stringify(tmpcarre[index]))
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
                let id = j+(i*10)
                newState = [...newState,...[{state:"safe",value:null, x:j+1, y:i+1, identifier:id}]]
            }
        }

        newBombe.forEach(function(item){
            newState[item].state = "boom"
        });


        newState.forEach(function(item){
            if(item.x == 0 || item.x == 9 || item.y == 0 || item.y == 9){ }
            else{
                let count = 0;
                tx=item.x-1;
                ty=item.y-1;

                t=item.identifier-11;

                for(i =0; i<=2; i++){
                    for(j=0; j<=20; j+=10){
                        if(tx == item.x && ty == item.y){
                        }
                        var tmpcarre = carre
                        index = t+i+j;
                        if(tmpcarre[index].state == "boom"){
                            count++
                        }
                    }
                }
                //alert(count);
                item.value = count;
            }
        });

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