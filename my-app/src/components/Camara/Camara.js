import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { storage } from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';


class Camara extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos:false, //permisos de acceso al hardware para usar la cámara.
            urlInternaFoto: '', //aca va la url temporal interna de la foto.
            mostrarCamara: true,
        }
        this.metodosDeCamara = '' //referenciar a los métodos internos del componente camera.
    }

    componentDidMount(){
       //Pedir permisos para uso del hardware.
       Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                    permisos: true
                })
            } )
            .catch( e => console.log(e)) 
    }

    SacarFoto(){
        console.log('sacando foto...');
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlInternaFoto: photo.uri, //La ruta interna de la foto en la computadora.
                    mostrarCamara: false //escondemos la cámara para mostrar un preview de la foto al usuario.
                })
            })
            .catch(e=>console.log(e))
    }

    guardarFoto(){
        fetch(this.state.urlInternaFoto)
            .then( res => res.blob()) //.blob() recupera datos binarios. Las fotos son archivos binarios.
            .then( image => {

                const ruta = storage.ref(`photos/${Date.now()}.jpg`);
                ruta.put( image )
                    .then(()=>{
                        ruta.getDownloadURL() //La url de guardado de la foto.
                            .then( url => {
                                //Necesitamos guardar la url en internet como un dato más del posteo.
                                this.props.traerUrlDeFoto(url)
                                //Borra la url temporal del estado.
                                this.setState({
                                    urlInternaFoto: '',
                                })
                            } )
                    })

            })
            .catch( e => console.log(e))

    }


    render() {
        return (
          <View style={styles.container}>
            {this.state.permisos ? (
              this.state.mostrarCamara === false ? (
                // Vista previa
                <View>
                  <Image
                    source={{ uri: this.state.urlInternaFoto }}
                    style={styles.previewImage}
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.guardarFoto()}
                    >
                      <Text style={styles.buttonText}>Aceptar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.setState({ mostrarCamara: true })}
                    >
                      <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                // Cámara
                <React.Fragment>
                  <Camera
                    type={Camera.Constants.Type.front}
                    ref={(metodosDeCamara) =>
                      (this.metodosDeCamara = metodosDeCamara)
                    }
                    style={styles.cameraBody}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.SacarFoto()}
                  >
                    <Text style={styles.buttonText}>Sacar Foto</Text>
                  </TouchableOpacity>
                </React.Fragment>
              )
            ) : (
              <Text>La cámara no tiene permisos</Text>
            )}
          </View>
        );
      }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cameraBody: {
      flex: 7,
      width: 400,
      height : 300,
    },
    previewImage: {
      flex: 1,
      width: 400,
      height : 300
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    button: {
      padding: 10,
      backgroundColor: '#3498db',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });  

export default Camara