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

        // let arrayNombresUsuario = []
        // let arrayEmailsUsuario = []

        // db.collection("users").get()
        //     .then(docs => {
        //         docs.forEach(doc => {
        //             arrayNombresUsuario.push(doc.data().userName)
        //             arrayEmailsUsuario.push(doc.data().email)
        //         })
        //     })
        //     .catch(error => console.log(error))

        // let arrayUsuarios = []
        
        // let arrayNombres = []
        // nombres.forEach(nombre => {
        //     if (nombre.toLowerCase().includes(terminoBuscado.toLowerCase())) {
        //         arrayNombres.push(nombre)
        //     }
        // })
            

        db.collection("users").where("userName", "==", terminoBuscado).get()
            .then(docs => {
                let arrayUsuarios = []
                if (docs.length === 0) {
                    db.collection("users").where("owner", "==", terminoBuscado).get()
                        .then(docs => {
                            docs.forEach(doc => {
                                arrayUsuarios.push(doc.data())
                            })
                            this.setState({ usuarios: arrayUsuarios, cargando: false })
                        })
                        .catch(error => console.log(error))
                } else {
                    docs.forEach(doc => {
                        arrayUsuarios.push(doc.data())
                    })
                    this.setState({ usuarios: arrayUsuarios, cargando: false })
                }
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
                    <View  style={styles.searchSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="Buscar un usuario"
                            onChangeText={( terminoBuscado ) => this.setState({ terminoBuscado })}
                            value={ this.state.terminoBuscado }
                        />
                        <TouchableOpacity 
                            style={styles.searchButton}
                            onPress={() => this.buscarUsuarios(this.state.terminoBuscado)}>
                            <Text  style={styles.searchButtonText}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                }

                { // Sección 2: listado de usuarios
                    this.state.cargando === null ?
                        null :
                        this.state.cargando ?
                            <Text>Cargando...</Text> :
                            <FlatList
                                data={this.state.usuarios}
                                renderItem={({ item }) => 
                                    <View style={styles.userContainer}>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate("Perfil", { email: item.email })}
                                        >
                                            <Text  style={styles.userName} >{item.userName}</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                                keyExtractor={item => item.email}
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
