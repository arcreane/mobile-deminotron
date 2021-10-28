// App.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './Pages/MainPage';
import DemineurPage from './Pages/DemineurPage';
import ShopPage from './Pages/ShopPage';
import NavBarre from './Components/NavBarre';
import StatPage from './Pages/StatPage';






const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
          <Stack.Screen name="DemineurPage" component={DemineurPage} options={{ headerShown: false }} />
          <Stack.Screen name="NavBarre" component={NavBarre} options={{ headerShown: false }} />
          <Stack.Screen name="ShopPage" component={ShopPage} options={{ headerShown: false }} />
          <Stack.Screen name="StatPage" component={StatPage} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}