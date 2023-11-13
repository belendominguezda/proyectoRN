import React, { Component } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { db } from "../../firebase/config";

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

    eliminarPost(postId) {
        db.collection("posts").where("id", "==", postId).get()
            .then((posts) => {
                posts.forEach((post) => {
                    db.collection("posts").doc(post.id).delete()
                        .then(() => {
                            console.log("Post eliminado");
                            this.navigation.navigate("Home", { nuevoPost: true });
                            return true;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    initialParams={{ eliminarPost : this.eliminarPost }}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="home" color={color} size={size} />
                        ),
                        tabBarLabel: () => null,
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="BuscadorUsuarios"
                    component={BuscadorUsuarios}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="search" color={color} size={size} />
                        ),
                        tabBarLabel: () => null,
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="CrearPosteo"
                    component={CrearPosteo}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="plus-square" color={color} size={size} />
                        ),
                        tabBarLabel: () => null,
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="MiPerfil"
                    component={MiPerfil}
                    initialParams={{ eliminarPost: this.eliminarPost }}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user" color={color} size={size} />
                        ),
                        tabBarLabel: () => null,
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        )
    }
}

export default TabNavigation;