import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";

import { auth, db } from "../../firebase/config";

class Comentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentarios: [],
            comentario: "",
        }
    }

    render() {
        return (
            <View>
                <Text>Screen comentarios</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default Comentarios;
