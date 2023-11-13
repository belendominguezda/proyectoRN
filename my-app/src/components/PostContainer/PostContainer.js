import React, { Component } from "react";

import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import { db } from "../../firebase/config";

import Post from "../Post/Post";

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            cargando: true,
        };
    }

    componentDidMount() {
        if (this.props.email) {
            db.collection("posts").where("owner", "==", this.props.email).get()
                .then(docs => {
                    let arrayPosts = []
                    docs.forEach(doc => {
                        arrayPosts.push(doc.data())
                    })

                    arrayPosts = arrayPosts.sort((a, b) => b.createdAt - a.createdAt)

                    this.setState({ posts: arrayPosts, cargando: false })
                })
                .catch(error => console.log(error))
        } else {
            // Consultar cantidad de posteos en la DB

            db.collection("posts").orderBy("createdAt", "desc").get()
                .then(docs => {
                    let arrayPosts = []
                    docs.forEach(doc => {
                        arrayPosts.push(doc.data())
                    })
                    this.setState({ posts: arrayPosts, cargando: false })
                })
                .catch(error => console.log(error))
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.nuevoPost !== prevProps.nuevoPost) {
            db.collection("posts").orderBy("createdAt", "desc").get()
                .then(docs => {
                    let arrayPosts = []
                    docs.forEach(doc => {
                        arrayPosts.push(doc.data())
                    })
                    this.setState({ posts: arrayPosts, cargando: false })
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                {
                    this.state.cargando ?
                    <Text>Cargando</Text> :
                    <View style={ styles.container }>
                        {
                            this.state.posts.length === 0 ?
                            <Text>No hay posts</Text> :
                            <FlatList
                                data={this.state.posts}
                                renderItem={({ item }) => (
                                    <View>
                                        <Post
                                            id={item.id}
                                            userName={item.userName}
                                            owner={item.owner}
                                            image={item.image}
                                            description={item.description}
                                            navigation={this.props.navigation}
                                            eliminarPost={this.props.eliminarPost} 
                                        />
                                        {this.props.email && (
                                            <TouchableOpacity style = {styles.button} onPress={() => this.props.eliminarPost(item.id.toString())}                                            >
                                                <Text style={styles.buttonText}>Eliminar Post</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}
                                keyExtractor={(item) => item.id.toString()} // Utilizar id como cadena
                                showsVerticalScrollIndicator={false}
                            />

                        }
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10, // Ajusta el espacio interno según tus preferencias
    }, button: {
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
        marginTop: 0,
        marginBottom: 20
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
  });
  

export default PostContainer;
