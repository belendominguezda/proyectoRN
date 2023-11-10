import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";

import { auth, db } from "../../firebase/config";

import PostContainer from "../../components/PostContainer/PostContainer";

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            cargando: true
        }
    }

    logout(){
        auth.signOut();
        
        //Redirigir al usuario a la home del sitio.
        this.props.navigation.navigate('Login')
    }

    componentDidMount() {
        let email = auth.currentUser.email

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
                <Text>HOLA, {auth.currentUser.email}. Bienvenido</Text>
                <TouchableOpacity onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                {
                    this.state.cargando ?
                    <Text>Cargando</Text> :
                    <PostContainer email={ auth.currentUser.email } navigation={ this.props.navigation }/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default MiPerfil;