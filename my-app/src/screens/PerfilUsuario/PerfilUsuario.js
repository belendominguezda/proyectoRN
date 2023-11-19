import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";

import { db } from "../../firebase/config";

import PostContainer from "../../components/PostContainer/PostContainer";

class PerfilUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            cargando: true
        }
    }

    componentDidMount() {
        let email = this.props.route.params.email

        db.collection("posts").where("owner", "==", email).get()
            .then(docs => {
                let arrayPosts = []
                docs.forEach(doc => {
                    arrayPosts.push(doc.data())
                })
                this.setState({ posts: arrayPosts, cargando: false })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={ styles.container }>
                <Text style={styles.title}> Perfil de Usuario</Text> 
                <TouchableOpacity 
                     style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.backButtonText}>&larr;</Text>
                </TouchableOpacity>
                <Text  style={styles.emailText}>Email: { this.props.route.params.email }</Text>
                {
                    this.state.cargando ?
                    <Text style={styles.loadingText}>Cargando</Text> :
                    <PostContainer 
                    email={ this.props.route.params.email } 
                    navigation={ this.props.route.params.navigation }
                    currentUserEmail={this.props.currentUserEmail}/>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    backButton: {
        alignSelf: "flex-start",
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#3498db",
        borderRadius: 8,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 18,
    },
    emailText: {
        fontSize: 18,
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 18,
        color: "#888",
    },
});

export default PerfilUsuario;
