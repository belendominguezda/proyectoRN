import React, { Component } from "react";

import { Text, View, StyleSheet, FlatList } from "react-native";

import { db } from "../../firebase/config";

import Post from "../Post/Post";

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            cargando: true
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
                                data={ this.state.posts }
                                renderItem={({ item }) => (
                                    <Post
                                        id={ item.id }
                                        userName={ item.userName }
                                        owner={ item.owner }
                                        image={ item.image }
                                        description={ item.description }
                                        navigation={ this.props.navigation }
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={ false }
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
        flex: 1
    }
})

export default PostContainer;
