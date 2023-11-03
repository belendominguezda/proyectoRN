import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {

    constructor(){
        super()

        this.state = {
            email: "",
            userName: "",
            pass: "",
            bio: "",
            fotoPerfil: "",
            error: null,
        }
    }


    register(email, pass, userName, bio, fotoPerfil){
        if (bio == null) {
            bio = ""; // Establece un valor predeterminado en blanco si bio es nulo
        }
    
        if (fotoPerfil == null) {
            fotoPerfil = ""; // Establece un valor predeterminado en blanco si fotoPerfil es nulo
        }
        if (userName == null) {
            userName = ""; // Establece un valor predeterminado en blanco si userName es nulo
        }
        
        auth.createUserWithEmailAndPassword(email, pass)
        .then(res => {
            let userData = {
                owner: email,
                userName: userName,
                createdAt: Date.now(),
                bio : bio,
                fotoPerfil : fotoPerfil
            };

            if (bio) {
                userData.bio = bio;
            }

            if (fotoPerfil) {
                userData.fotoPerfil = fotoPerfil;
            }

            db.collection('users').add(userData)
            .then(()=>{
                console.log("entré")
                // Limpia los estados después del registro
                this.setState({
                    email:"",
                    userName: "",
                    pass:"",
                    bio: "",
                    fotoPerfil:"",
                    error : null
                })
            })
            this.props.navigation.navigate('Login')
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

            this.setState({ error:error.message });
            console.log(error);
        });
      }
     
      render(){
        return(
            <View styles = {styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                    style = {styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder = "email"
                    keyboardType = "email-address"
                    value = {this.state.email}
                />

                <TextInput
                    style = {styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder = "user name"
                    keyboardType = "default"
                    value = {this.state.userName}
                />

                <TextInput
                    style = {styles.input}
                    onChangeText={(text)=>this.setState({pass: text})}
                    placeholder = "password"
                    keyboardType = "default"
                    secureTextEntry={true}
                    value = {this.state.pass}

                />

                <TextInput
                    style = {styles.input}
                    onChangeText={(text)=>this.setState({bio: text})}
                    placeholder = "mini bio"
                    keyboardType = "default"
                    value = {this.state.bio}
                />

                <TextInput
                    style = {styles.input}
                    onChangeText={(text)=>this.setState({fotoPerfil: text})}
                    placeholder = "URL para foto de perfil"
                    keyboardType = "default"
                    value = {this.state.fotoPerfil}
                />

                 {/* Mostrar el mensaje de error si existe el error */}
                {this.state.error ? (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                ) : 
                null}
    
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.pass)}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text>¿Ya tenes cuenta? Ir al login</Text>
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
  
  export default Register;


  