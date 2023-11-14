import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";

import { db } from "../../firebase/config";

class BuscadorUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terminoBuscado: "",
            usuarios: [],
            cargando: null
        }
    }

    buscarUsuarios(terminoBuscado) {
        this.setState({ cargando: true })

        db.collection("users").get()
            .then(docs => {
                let arrayUsuarios = []
                docs.forEach(doc => {
                    let usuario = doc.data()
                    let nombreUsuarioMinuscula = usuario.userName.toLowerCase()
                    if (nombreUsuarioMinuscula.includes(terminoBuscado.toLowerCase())) {
                        arrayUsuarios.push(usuario)
                    } else {
                        let emailUsuarioMinuscula = usuario.owner.toLowerCase()
                        if (emailUsuarioMinuscula.includes(terminoBuscado.toLowerCase())) {
                            arrayUsuarios.push(usuario)
                        }
                    }

                })
                this.setState({ usuarios: arrayUsuarios, cargando: false })
            })
            .catch(error => console.log(error))

        
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text>Volver</Text>
                </TouchableOpacity>

                { // Sección 1: formulario de búsqueda
                    <View style={styles.searchSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="Buscar un usuario"
                            onChangeText={( terminoBuscado ) => {
                                this.buscarUsuarios(terminoBuscado)
                                this.setState({ terminoBuscado })}
                            }
                            value={ this.state.terminoBuscado }
                        />
                    </View>
                }

                { // Sección 2: listado de usuarios
                    this.state.cargando === null ?
                        null :
                        this.state.cargando ?
                            <Text>Cargando...</Text> :
                                this.state.usuarios.length === 0 ?
                                    <Text>No hay usuarios que coincidan con la búsqueda</Text> :
                                    <FlatList
                                        data={this.state.usuarios}
                                        renderItem={({ item }) => 
                                            <View style={styles.userContainer}>
                                                <TouchableOpacity
                                                    onPress={() => this.props.navigation.navigate("PerfilUsuario", { email: item.owner, navigation: this.props.navigation })}
                                                >
                                                    <Text>{item.userName}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                        keyExtractor={item => item.createdAt.toString()}
                                    />
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
    backButton: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#3498db",
        borderRadius: 8,
        alignItems: "center",
    },
    searchSection: {
        flexDirection: "row",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    searchButton: {
        padding: 10,
        backgroundColor: "#3498db",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    searchButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    userContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    userName: {
        fontSize: 16,
    },
});


export default BuscadorUsuarios;

