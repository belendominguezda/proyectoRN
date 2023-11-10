import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={80} color="#405DE6" style={styles.gif} />
            <Text style={styles.texto}>Cargando</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gif: {
        margin: 20,
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#405DE6',
    }
});