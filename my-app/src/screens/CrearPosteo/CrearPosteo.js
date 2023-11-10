import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";

import { auth, db, storage } from "../../firebase/config";

class CrearPosteo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            description: "",
            error: null,
        }
    }

    agregarPosteo(imagen, description) {
        let Posteo = {
            id: Date.now(),
            owner: auth.currentUser.email,
            userName: auth.currentUser.displayName,
            createdAt: Date.now(),
            image: imagen,
            description: description,
            likes: [],
            comentarios: []
        }

        db.collection('posts').add(Posteo)
        .then(() => {
            console.log("Posteo agregado")
            this.setState({
                image: "",
                description: ""
            })
            this.props.navigation.navigate("CreacionExitosa", { navigation : this.props.navigation })
        })
        .catch(error => console.log(error))

}

render() {
    return (
        <View>
            <Text>Crear posteo</Text>

            <Text>URL de la imagen</Text>
            <TextInput
                style={styles.input}
                placeholder="https://www.example.com"
                keyboardType="default"
                onChangeText={(text) => this.setState({ image: text })}
                value={this.state.image}
            />

            <Text>Descripción del posteo</Text>
            <TextInput
                style={styles.input}
                placeholder="Esta es la descripción del posteo"
                keyboardType="default"
                onChangeText={(text) => this.setState({ description: text })}
                value={this.state.description}
            />

            <TouchableOpacity
                onPress={() => this.agregarPosteo(this.state.image, this.state.description)}
            >
                <Text>Postear</Text>
            </TouchableOpacity>
        </View>
    )
}
}

const styles = StyleSheet.create({
    input: {
        
    }
});

export default CrearPosteo;