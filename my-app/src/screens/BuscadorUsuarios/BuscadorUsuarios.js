import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";

import { db } from "../../firebase/config";

class BuscadorUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <Text>Screen Buscador de usuarios</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default BuscadorUsuarios;
