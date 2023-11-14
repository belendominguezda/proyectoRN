import React, { Component } from "react";

import { auth } from "../../firebase/config";

class Contrasenia extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nueva_contrasenia: "",
            error: null
        }
    }

    cambiarContrasenia(nueva_contrasenia) {
        auth.currentUser.updatePassword(nueva_contrasenia)
            .then(() => {
                console.log("Contraseña cambiada")
                auth.signOut()
                this.props.navigation.navigate("Login")
            })
            .catch(error => {
                console.log(error)
                this.setState({ error: error.message })
            })
    }

    // Cambiar contraseña auth

    // Formulario
    // Input nueva contraseña ---> let nueva_contraseña = "1234"

    // El botón de "cambiar contraseña" ejecuta la siguiente función:
    // auth.currentUser.updatePassword(this.state.nueva_contraseña)
    //     .then(() => {
    //         console.log("Contraseña cambiada correctamente")
    //     })
    //     .catch(error => {
    //         console.log("Error al cambiar la contraseña", error)
    //     })

    render() {
        return (
            <View>
                {/* Formulario */}
                    {/* Input */}
                    {/* Botón cambiar contraseña */}
            </View>
        )
    }
}

export default Contrasenia;
