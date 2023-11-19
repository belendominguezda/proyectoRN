import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";

import { auth, db } from "../../firebase/config";

import PostContainer from "../../components/PostContainer/PostContainer";

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            cargando: true,
            minibio: "",
            fotoPerfil: "",
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

        db.collection("users").where("owner", "==", email).get()
            .then(docs => {
                docs.forEach(doc => {
                    console.log(doc.data())
                    this.setState({ minibio: doc.data().bio, fotoPerfil: doc.data().fotoPerfil, cargando: false })  
                })
            })
            .catch(error => console.log(error))

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
    
    cambiarContrasenia = () => {
        this.props.navigation.navigate("Contrasenia");
    };

    render() {
        return (
            <View style={ styles.container }>
                <Text style={styles.textoSaludo}>HOLA, { auth.currentUser.displayName }. Bienvenido</Text>
                <Text style={styles.textoSaludo}>Minibio: {this.state.minibio}</Text>

                {this.state.fotoPerfil ?
                    <Image
                        source={{ uri: this.state.fotoPerfil }}
                        style={styles.image}
                        resizeMode="contain"
                    /> :
                    null
                }
                <Text style={styles.totalPosts}>Total de publicaciones: {this.state.totalPosts || 0}</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cambiarContraseniaButton} onPress={this.cambiarContrasenia}>
                    <Text style={styles.cambiarContraseniaButtonText}>Cambiar Contraseña</Text>
                </TouchableOpacity>
               
                {
                    this.state.cargando ?
                    <Text>Cargando</Text> :
                    <PostContainer 
                        email={ auth.currentUser.email } 
                        navigation={ this.props.navigation } 
                        nuevoPost={this.state.nuevoPost} // Pasar nuevoPost como prop
                        eliminarPost = { this.props.route.params.eliminarPost }
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
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 10,
    }, cambiarContraseniaButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    cambiarContraseniaButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    
});

export default MiPerfil;

