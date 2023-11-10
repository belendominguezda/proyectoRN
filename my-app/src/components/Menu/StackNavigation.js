import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet } from "react-native";

import { auth } from "../../firebase/config";

import Register from "../../screens/Register/Register";
import Login from "../../screens/Login/Login";
import TabNavigation from "./TabNavigation";
import PerfilUsuario from "../../screens/PerfilUsuario/PerfilUsuario";
import Comentarios from "../../screens/Comentarios/Comentarios";

const Stack = createNativeStackNavigator();

class StackNavigation extends Component {
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
        return (
            <NavigationContainer style={ styles.container }>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Register"
                        component={ Register }
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Login"
                        component={ Login }
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="TabNavigation"
                        component={ TabNavigation }
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Comentarios"
                        component={ Comentarios }
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="PerfilUsuario"
                        component={ PerfilUsuario }
                        options={{ headerShown: false }}
                    />  
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
})

export default StackNavigation;