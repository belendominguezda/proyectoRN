import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";
import { auth, db, storage } from "../../firebase/config";
import Camara from "../../components/Camara/Camara";

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
    traerUrlDeFoto(url){
        this.setState({
            image:url
        })
    }

render() {
    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Crear posteo</Text>
            <Text style={styles.elemento}>URL de la imagen</Text>

            <Camara style={styles.camara} traerUrlDeFoto = {url=>this.traerUrlDeFoto(url)} />

            <TextInput
                style={styles.input}
                placeholder="https://www.example.com"
                keyboardType="default"
                onChangeText={(text) => this.setState({ image: text })}
                value={this.state.image}
            />

            <Text style={styles.elemento}>Descripción del posteo</Text>
            <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Esta es la descripción del posteo"
                keyboardType="default"
                onChangeText={(text) => this.setState({ description: text })}
                value={this.state.description}
            />

            <TouchableOpacity style={styles.postButton}
                onPress={() => this.agregarPosteo(this.state.image, this.state.description)}
            >
                <Text style={styles.postButtonText}>Postear</Text>
            </TouchableOpacity>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    elemento: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    multilineInput: {
        textAlignVertical: "top", // For multiline input to start from the top
    },
    postButton: {
        backgroundColor: "#3498db",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    postButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    camara:{
        height: 400,
    }
});

export default CrearPosteo;