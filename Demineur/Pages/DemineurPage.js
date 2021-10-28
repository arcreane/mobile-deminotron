import React from 'react';
import Demineur from '../Components/Demineur';
import { StyleSheet, View, Text } from 'react-native';


function DemineurPage({ navigation }) {

        return (

            <View style={{position: 'absolute', top: '15%', left: '10%'}}>   
              <Demineur></Demineur>
            </View>
            
    
        )
    }


const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      height: '100%',
      width: '100%',
    },
    containerReactions: {
      position: 'absolute',
      top: 600,
      left: 200,
      height: 300,
    }
  });

  export default DemineurPage;

