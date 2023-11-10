import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../../firebase/config";

const { width } = Dimensions.get('window');

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            likes: [],
            comentario: 0
        };
    }

    componentDidMount() {
        this.obtenerInformacionPost();
    }

    obtenerInformacionPost() {
        const id = this.props.id;

        db.collection("posts")
            .where("id", "==", id)
            .onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const arrayLikes = data.likes || [];
                    const cantidadComentarios = data.comentarios ? data.comentarios.length : 0;

                    this.setState({
                        like: arrayLikes.includes(auth.currentUser.email),
                        likes: arrayLikes,
                        comentario: cantidadComentarios,
                    });
                });
            });
    }

    darLike() {
        const id = this.props.id;
        const likes = this.state.likes;

        const nuevoArrayLikes = likes.push(auth.currentUser.email);

        db.collection("posts").where("id", "==", id).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("posts").doc(doc.id).update({
                        likes: nuevoArrayLikes,
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    quitarLike() {
        const id = this.props.id;
        const likes = this.state.likes;

        const nuevoArrayLikes = likes.filter((like) => like !== auth.currentUser.email);

        db.collection("posts").where("id", "==", id).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("posts").doc(doc.id).update({
                        likes: nuevoArrayLikes,
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("PerfilUsuario", { email: this.props.owner, navigation: this.props.navigation })}>
                    <Text>{this.props.userName}</Text>
                </TouchableOpacity>
                <Image
                    source={{ uri: this.props.image }}
                    style={styles.imagen}
                    resizeMode="contain"
                />
                <Text>{this.props.description}</Text>
                {this.state.likes.length > 0 ? (
                    <View>
                        { this.state.like ? (
                            <TouchableOpacity onPress={() => this.quitarLike()}>
                                <Text>
                                    <FontAwesome name="heart" size={24} color="red" />
                                    <Text> {this.state.likes.length} likes</Text>
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => this.darLike()}>
                                <Text>
                                    <FontAwesome name="heart" size={24} color="gray" />
                                    <Text> {this.state.likes.length} likes</Text>
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => this.darLike()}>
                        <Text>
                            <FontAwesome name="heart" size={24} color="gray" />
                            <Text> {this.state.likes.length} likes</Text>
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Comentarios", { id: this.props.id })}>
                    <Text>Hay {this.props.comentario} Comentarios</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    imagen: {
        width: width * 3 / 5,
        height: width * (3 / 5) * (2 / 3),
    },
});

export default Post;
