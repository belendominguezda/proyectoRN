import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {auth } from '../my-app/src/firebase/config'


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login'
import Home from './src/screens/Home/Home'

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      console.log("Chequear si el usuario está loguado en firebase.");
      if (user) {
        // El usuario está autenticado, redirigirlo a la pantalla Home.
        console.log(user)
        this.setState({ isAuthenticated: true, isLoading: false });
      } else {
        // El usuario no está autenticado.
        console.log(user)
        this.setState({ isAuthenticated: false, isLoading: false }); //esto deberia ser true pero sino no funciona
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      // Muestra el cargador mientras se comprueba la sesión.
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    const { isAuthenticated } = this.state;

    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          
          {isAuthenticated ? (
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            </>
          )}
          {/* Si implementas una tab navigation para el resto de la app, el tercer componente debe ser una navegación que tenga a Home como el primer screen */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default App;

