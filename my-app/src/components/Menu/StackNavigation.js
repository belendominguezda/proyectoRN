import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet } from "react-native";

import { auth } from "../../firebase/config";

import Loading from "../../screens/Loading/Loading";
import TabNavigation from "./TabNavigation";
import Register from "../../screens/Register/Register";
import Login from "../../screens/Login/Login";
import PerfilUsuario from "../../screens/PerfilUsuario/PerfilUsuario";
import Comentarios from "../../screens/Comentarios/Comentarios";
import CreacionExitosa from "../../screens/CreacionExitosa/CreacionExitosa";

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
            if (user) {
                this.setState({
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                this.setState({
                    isAuthenticated: false,
                    isLoading: false,
                });
            }
        });
    }

    render() {
        return (
            <NavigationContainer style={ styles.container }>
                <Stack.Navigator>
                    {
                        this.state.isLoading ?
                            <Stack.Screen
                                name="Loading"
                                component={ Loading }
                                options={{ headerShown: false }}
                            /> :
                            null
                    }
                    {
                        this.state.isAuthenticated ?
                            <Stack.Screen
                                name="TabNavigation"
                                component={ TabNavigation }
                                options={{ headerShown: false }}
                            /> : 
                            <Stack.Group>
                                <>
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
                                </>
                            </Stack.Group>
                    }
                    <Stack.Screen
                        name="CreacionExitosa"
                        component={ CreacionExitosa }
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
