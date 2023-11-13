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
            .onSnapshot(function (snapshot) {
                snapshot.forEach(function (doc) {
                    const data = doc.data();
                    const arrayLikes = data.likes || [];
                    const cantidadComentarios = data.comentarios ? data.comentarios.length : 0;

                    this.setState({
                        like: arrayLikes.includes(auth.currentUser.email),
                        likes: arrayLikes,
                        comentario: cantidadComentarios,
                    });
                }.bind(this));
            }.bind(this));
    }

    darLike() {
        const id = this.props.id;
        const likes = this.state.likes;

        const nuevoArrayLikes = likes.concat(auth.currentUser.email);

        db.collection("posts")
            .where("id", "==", id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    db.collection("posts").doc(doc.id).update({
                        likes: nuevoArrayLikes,
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    quitarLike() {
        const id = this.props.id;
        const likes = this.state.likes;

        const nuevoArrayLikes = likes.filter(function (like) {
            return like !== auth.currentUser.email;
        });

        db.collection("posts")
            .where("id", "==", id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    db.collection("posts").doc(doc.id).update({
                        likes: nuevoArrayLikes,
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    

    render() {
        const userName = this.props.userName;
        const image = this.props.image;
        const description = this.props.description;
        const navigation = this.props.navigation;

        const like = this.state.like;
        const likes = this.state.likes;
        const comentario = this.state.comentario;

        const owner = this.props.owner;
        const currentUserEmail = auth.currentUser.email;



        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("PerfilUsuario", { email: this.props.owner, navigation })}>
                    <Text>{userName}</Text>
                </TouchableOpacity>
                <Image
                    source={{ uri: image }}
                    style={styles.imagen}
                    resizeMode="contain"
                />
                <Text>{description}</Text>
                {likes.length > 0 ? (
                    <View>
                        {like ? (
                            <TouchableOpacity onPress={() => this.quitarLike()}>
                                <Text>
                                    <FontAwesome name="heart" size={24} color="red" />
                                    <Text> {likes.length} likes</Text>
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => this.darLike()}>
                                <Text>
                                    <FontAwesome name="heart" size={24} color="gray" />
                                    <Text> {likes.length} likes</Text>
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => this.darLike()}>
                        <Text>
                            <FontAwesome name="heart" size={24} color="gray" />
                            <Text> {likes.length} likes</Text>
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => navigation.navigate("Comentarios", { id: this.props.id })}>
                    <Text>Hay {comentario} Comentarios</Text>
                </TouchableOpacity>
                {
                    currentUserEmail === owner ?
                    <TouchableOpacity onPress={() => this.props.eliminarPost(this.props.id)}>
                        <Text>Eliminar Post</Text><Text>{this.props.id}</Text>
                    </TouchableOpacity> : 
                    null
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        fontFamily: 'IBM Plex Serif Regular'
    },
    imagen: {
        width: width * 3 / 5,
        height: width * (3 / 5) * (2 / 3),
        borderRadius: 8,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    likeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    likeIcon: {
        marginRight: 5,
    },
    commentLink: {
        color: "blue",
        marginTop: 5,
    },
});


export default Post;