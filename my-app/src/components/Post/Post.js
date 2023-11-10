import React, { Component } from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { auth, db } from "../../firebase/config";

import {
    FontAwesome,
} from "@expo/vector-icons";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            likes: [],
            comentario: 0
        }
    }

    componentDidMount() {
        this.traerLikes()
        this.traerComentarios()
    }

    traerLikes() {
        // Busca los likes de este posteo en la DB y los guarda en el estado
        let arrayLikes
        db.collection("posts").doc(this.props.id).get()
            .then(doc => {
                arrayLikes = doc.data().likes
                this.setState({ likes: arrayLikes })
            })
            .catch(error => console.log(error))
    }

    darLike() {

    }

    quitarLike() {

    }

    traerComentarios() {
        // Busca los comentarios de este posteo en la DB y los guarda en el estado
        let cantidadComentarios
        db.collection("posts").doc(this.props.id).get()
            .then(doc => {
                cantidadComentarios = doc.data().comentarios.length
                this.setState({ comentario: cantidadComentarios })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("PerfilUsuario", { email: this.props.owner })}>
                    <Text>{ this.props.userName }</Text>
                </TouchableOpacity>
                <Image
                    source={{ uri: this.props.image }}
                    style={ styles.imagen }
                />
                <Text>{ this.props.description }</Text>
                {
                    this.state.likes.length > 0 ?
                        <View>
                            {
                                this.state.like ?
                                <TouchableOpacity onPress={() => this.quitarLike()}>
                                    <Text>
                                        <FontAwesome name="heart" size={24} color="red" />
                                    </Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => this.darLike()}>
                                    <Text>
                                        <FontAwesome name="hearto" size={24} color="gray" />
                                    </Text>
                                </TouchableOpacity>
                            }
                        </View> :
                        null

                }
                <Text>{ this.state.likes.length } likes</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Comentarios", { id: this.props.id })}>
                    <Text>Hay { this.state.comentario }Comentarios</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imagen: {
        width: 100,
        height: 300,
        resizeMode: "contain"
    }
});

export default Post;