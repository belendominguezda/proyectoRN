import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";

import { auth, db } from "../../firebase/config";

class Comentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentarios: [], // LO QUE LLEGA DE LA DB
            comentario: "", // FORMULARIO
            cargando: true
        }
    }

    componentDidMount() {
        db.collection("posts").onSnapshot((posts) => {
            posts.forEach((post) => {
                if (post.data().id == parseInt(this.props.route.params.id)) {
                    this.setState({ comentarios: post.data().comentarios || [], cargando: false })
                }
            });
        })
    }

    comentar(texto) {
        if (texto !== "") {

            let comentario = {
                comentario: texto,
                owner: auth.currentUser.email,
                createdAt: Date.now(),
            }

            let comentarios = this.state.comentarios;
            comentarios.push(comentario);

            db.collection("posts").where("id", "==", parseInt(this.props.route.params.id)).get()
                .then(posts => {
                    posts.forEach((post) => {
                        db.collection("posts").doc(post.id).update({
                            comentarios: comentarios
                        })
                            .then(() => {
                                this.setState({ comentario: "", comentarios: comentarios })
                            })
                            .catch(error => console.log(error))
                    });
                })
        } else {
            alert("El comentario no puede estar vacío")
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.text}>Volver</Text>
                </TouchableOpacity>
                { // Sección 1: listar los comentario
                    <View style={styles.commentsSection}>
                        {
                            this.state.cargando ?
                                <Text>Se están cargando los comentarios</Text> :
                                this.state.comentarios.length > 0 ?
                                    <FlatList
                                        data={this.state.comentarios}
                                        renderItem={({ item }) => 
                                            <View style={styles.commentContainer}>
                                                <Text style={styles.commentText}>{item.comentario}</Text>
                                                <Text style={styles.ownerText}>{item.owner}</Text>
                                            </View>
                                        }
                                    /> :
                                    <Text>No hay comentarios</Text>       
                        }
                    </View>
                }
                
                { // Sección 2: formulario para agregar un comentario
                    <View style={styles.commentForm}>
                        <TextInput
                            style={styles.commentInput}
                            onChangeText={(texto) => this.setState({ comentario: texto })}
                            placeholder="Escribe un comentario"
                            value={this.state.comentario}
                        />
                        <TouchableOpacity 
                            style={styles.commentButton}
                            onPress={() => this.comentar(this.state.comentario)}>
                            <Text>Comentar</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    text:{
    },
    backButton: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#3498db",
        borderRadius: 8,
        alignItems: "center",
    },
    commentsSection: {
      marginBottom: 10,
    },
    commentContainer: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#f0f0f0",
      borderRadius: 8,
    },
    commentText: {
      fontSize: 16,
    },
    ownerText: {
      fontSize: 14,
      color: "#888",
    },
    commentForm: {
      flexDirection: "row",
      alignItems: "center",
    },
    commentInput: {
      flex: 1,
      marginRight: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
    },
    commentButton: {
      padding: 10,
      backgroundColor: "#3498db",
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Comentarios;
