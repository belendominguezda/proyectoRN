import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {

    constructor(){
        super()

        this.state = {
            email: "",
            userName: "",
            password: "",

        }
    }

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
         .then( response => {
             this.setState({registered: true});
          })     
         .catch( error => {
           this.setState({error: 'Fallo en el registro.'})
         })
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
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder = "password"
                    keyboardType = "email-address"
                    value = {this.state.password}

                />

                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Registrarse</Text>
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
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default Register;