import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";

import { auth, db } from "../../firebase/config";

import PostContainer from "../../components/PostContainer/PostContainer";

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            cargando: true,
            userName: "",
            nuevoPost:  false
        }
    }

    logout(){
        auth.signOut();
        
        //Redirigir al usuario a LOGIN.
        this.props.navigation.navigate('Login')
    }

    componentDidMount() {
        let email = auth.currentUser.email

             let currentUser = db.collection("users").doc(email);
             currentUser
                 .get()
                 .then((user) => {
                     console.log("Info del usuario:", user.data());
                     if (user.exists) {
                         let username = user.data().userName;
                         this.setState({ userName: username, cargando: false });
                     } else {
                         console.log("Usuario no encontrado");
                         this.setState({ cargando: false });
                     }
                 })
                 .catch((error) => {
                     console.error("Error al obtener info del usuario:", error);
                     this.setState({ cargando: false });
                 });

        db.collection("posts").where("owner", "==", email).get()
            .then(docs => {
                let arrayPosts = []
                docs.forEach(doc => {
                    arrayPosts.push(doc.data())
                })
                this.setState({ posts: arrayPosts, cargando: false, totalPosts: arrayPosts.length })
            })
            .catch(error => console.log(error))
    }

    eliminarPost = (postId) => {
        db.collection("posts")
            .doc(postId)
            .delete()
            .then(() => {
                console.log("Post eliminado correctamente");
                // Actualizar el estado para reflejar la eliminación del post
                this.setState(
                    (prevState) => ({
                        posts: prevState.posts.filter((post) => post.id !== postId),
                        totalPosts: prevState.totalPosts - 1,
                        nuevoPost: !prevState.nuevoPost, // Cambiar el estado de nuevoPost
                    }),
                    () => console.log("Estado actualizado:", this.state.posts)
                );
            })
            .catch((error) => {
                console.error("Error al eliminar el post:", error);
                // Agrega aquí cualquier lógica de manejo de errores adicional
            });
    };
    
    
    

    render() {
        return (
            <View style={ styles.container }>
                <Text style={styles.textoSaludo}>HOLA, {this.state.userName || this.state.email }. Bienvenido</Text>
                <Text style={styles.totalPosts}>Total de publicaciones: {this.state.totalPosts || 0}</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
                {
                    this.state.cargando ?
                    <Text>Cargando</Text> :
                    <PostContainer 
                        email={ auth.currentUser.email } 
                        navigation={ this.props.navigation } 
                        eliminarPost={this.eliminarPost}
                        nuevoPost={this.state.nuevoPost} // Pasar nuevoPost como prop
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    textoSaludo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    totalPosts: {
        fontSize: 16,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    logoutButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default MiPerfil;

