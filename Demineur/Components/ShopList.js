import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

function ShopList(props){


    let [objects, setObjects] = useState("");

    useEffect(() => {

        let mounted = true;
           
        fetch('https://hugocabaret.onthewifi.com/Deminotron/API/requetes/Objet/GetAllObjets.php')
        .then((response) => response.json())
        .then((data) => {
            if(mounted){
                setObjects(data)
            }
        }); 
    
        return () => mounted = false;
    }, []);



    let renderItem = ({item}) => {
        return(
            <TouchableOpacity onPress={()=>buyItem(item)} style={{height:100, width:100,margin:1}}>
                <View>
                    <Image style={{width:75,height:75 }} source={{uri:item[1].image}}></Image>
                    <Text style={{zIndex:'1'}}>{item[1].nom}</Text>
                    <Text style={{zIndex:'1'}}>{item[1].prix}</Text>
                </View>
            </TouchableOpacity>
        )
    };


    function buyItem(item) {
        alert(JSON.stringify(item[1]))
    }

    // returne l
    return (
        <FlatList style={{padding:15}} data={Object.entries(objects)} renderItem={renderItem} keyExtractor = {item => item.id_obj} numColumns={2}/>
    )

}

export default ShopList

