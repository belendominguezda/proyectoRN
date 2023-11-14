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
                                            <View>
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

});

export default BuscadorUsuarios;
