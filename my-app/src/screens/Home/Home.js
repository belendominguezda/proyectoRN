import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Home extends Component {

    constructor(){
        super()

        this.state = {
            

        }
    }

     
      render(){
        return(
            <View styles = {styles.formContainer}>
                <Text>Home</Text>

            </View>
            

        )
      }

}

const styles = StyleSheet.create({
    
    
  });
  
  export default Home;