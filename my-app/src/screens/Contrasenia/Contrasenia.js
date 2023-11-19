import React, { Component } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { auth } from "../../firebase/config";

class Contrasenia extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nueva_contrasenia: "",
            error: null
        };
    }

    cambiarContrasenia = () => {
        let { nueva_contrasenia } = this.state;

        if (nueva_contrasenia.length < 6) {
            this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }

        auth.currentUser.updatePassword(nueva_contrasenia)
            .then(() => {
                console.log("Contraseña cambiada exitosamente");
                auth.signOut(); 
                this.props.navigation.navigate("TabNavigation"); 
            })
            .catch(error => {
                console.log("Error al cambiar la contraseña", error);
                this.setState({ error: error.message });
            });
    };

    render() {
        return (
            <View>
                {/* Formulario */}
                <TextInput
                    placeholder="Nueva Contraseña"
                    secureTextEntry
                    onChangeText={text => this.setState({ nueva_contrasenia: text })}
                    value={this.state.nueva_contrasenia}
                />
                {this.state.error && <Text style={{ color: 'red' }}>{this.state.error}</Text>}
                <Button title="Cambiar Contraseña" onPress={this.cambiarContrasenia} />
            </View>
        );
    }
}

export default Contrasenia;