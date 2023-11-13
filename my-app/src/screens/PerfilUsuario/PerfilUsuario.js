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
                <Text>Screen Perfil de Usuario</Text>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Text>&larr;</Text>
                </TouchableOpacity>
                <Text>Email: { this.props.route.params.email }</Text>
                {
                    this.state.cargando ?
                    <Text>Cargando</Text> :
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
    }
});

export default PerfilUsuario;
