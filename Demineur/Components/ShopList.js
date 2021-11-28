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
            <TouchableOpacity onPress={()=>buyItem(item)} style={styles.container}>
                <View>
                    <Image style={styles.image} source={{uri:item[1].image}}></Image>
                    <Text style={styles.textNom}>{item[1].nom}</Text>
                    <Text style={styles.textPrix}>{item[1].prix}</Text>
                </View>
            </TouchableOpacity>
        )
    };


    function buyItem(item) {
        alert("vous avez acheté "+(item[1].nom))
    }

    // returne l
    return (
        <FlatList style={{padding:15}} data={Object.entries(objects)} renderItem={renderItem} keyExtractor = {item => item.id_obj} numColumns={3}/>
    )

}

const styles = StyleSheet.create({

    container:{
            height:150,
            width:100,




    },
    image:{width:75,
           height:75,
           borderRadius:19,
           margin:15, 
           marginBottom:20,

    
    
    },
    textNom:{zIndex:1,
            marginTop:-15, 
            marginLeft:10,
  
 
 
 },
    textPrix:{zIndex:1,
           marginTop:5, 
           marginLeft:10,
           marginBottom:30,



}

})

export default ShopList

