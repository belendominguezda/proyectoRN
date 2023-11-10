import React, { Component } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StyleSheet } from "react-native";

import Home from "../../screens/Home/Home";
import BuscadorUsuarios from "../../screens/BuscadorUsuarios/BuscadorUsuarios";
import CrearPosteo from "../../screens/CrearPosteo/CrearPosteo";
import MiPerfil from "../../screens/MiPerfil/MiPerfil";

import {
    FontAwesome,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

class TabNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home"
                    component={ Home }
                    options={{ headerShown: false }}
                />
                <Tab.Screen 
                    name="BuscadorUsuarios"
                    component={ BuscadorUsuarios }
                    options={{ headerShown: false }}
                />
                <Tab.Screen 
                    name="CrearPosteo"
                    component={ CrearPosteo }
                    options={{ headerShown: false }}
                />
                <Tab.Screen 
                    name="MiPerfil"
                    component={ MiPerfil }
                    options={{ headerShown: false }}
                />
            </Tab.Navigator>
        )
    }
}

export default TabNavigation;