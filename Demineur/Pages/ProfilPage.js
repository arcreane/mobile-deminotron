import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfilPage(props) {
    
    return (

        <View style={{position: 'absolute', top: 100}}>
            <Text>Page de Profil</Text>
        </View>
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

export default ProfilPage;