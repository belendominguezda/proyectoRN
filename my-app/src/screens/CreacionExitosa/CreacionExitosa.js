import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CreacionExitosa(props) {
    return (
        <View style={ styles.container }>
            <Text style={ styles.texto }>El posteo se creó con éxito</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Home", { nuevoPost : true })} >
                <Text>Volver al Home</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    texto: {
        fontSize: 20,
        fontWeight: "bold"
    }
})