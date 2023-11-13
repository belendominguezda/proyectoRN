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
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text>Volver</Text>
                </TouchableOpacity>

                { // Sección 1: formulario de búsqueda
                    <View>
                        <TextInput
                            placeholder="Buscar un usuario"
                            onChangeText={( terminoBuscado ) => this.setState({ terminoBuscado })}
                            value={ this.state.terminoBuscado }
                        />
                        <TouchableOpacity onPress={() => this.buscarUsuarios(this.state.terminoBuscado)}>
                            <Text>Buscar</Text>
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
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate("Perfil", { email: item.email })}
                                        >
                                            <Text>{item.userName}</Text>
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

});

export default BuscadorUsuarios;
