import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component {

    constructor(){
        super()

        this.state = {
            email: "",
            pass: "",
            error: null

        }
    }

    login(email, pass){
        
        if (!email || !pass) {
            this.setState({ error: "Por favor, completa todos los campos obligatorios." });
            return; // Salir de la función si faltan campos
        }

        auth.signInWithEmailAndPassword(email, pass)
         .then( response => {
            console.log ("Login OK")
             this.setState({login: true});

             // Hay que limpiar los estados despues de el log in

             this.props.navigation.navigate('Home')
          })     
          .catch(error => {
            let errorMessage = "Fallo en el registro";
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "El correo electrónico ya está en uso";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "El correo electrónico no es válido";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "La contraseña es demasiado débil";
            } 
            this.setState({ error: errorMessage });
        });
      }
     
      render(){
        return(
            <View styles = {styles.formContainer}>
                <Text>Login</Text>
                <TextInput
                    style = {styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder = "email"
                    keyboardType = "email-address"
                    value = {this.state.email}
                />

                <TextInput
                    style = {styles.input}
                    onChangeText={(text)=>this.setState({pass: text})}
                    placeholder = "password"
                    keyboardType = "default"
                    secureTextEntry={true}
                    value = {this.state.pass}

                />

                 {/* Mostrar el mensaje de error si existe el error */}
                {this.state.error ? (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                ) : 
                null}
                

                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.pass)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text>¿No tenes cuenta? Ir al register</Text>
                </TouchableOpacity>


            </View>
            

        )
      }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: 300,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      paddingLeft: 10,
    },
    button: {
        backgroundColor: "#405DE6",
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#fff",
        width: 300,
        marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default Login;


  