import React from 'react';
import { View, TextInput, Button, StyleSheet} from 'react-native';

export default props => (
    <View style={styles.container} >
        <View style={styles.formContainer}>
            <TextInput placeholder="Nome" />
            <TextInput placeholder="Email" />
            <TextInput placeholder="Senha" />

        </View>
        <View style={styles.buttonContainer}>
            <Button title="Cadastrar" color='#333' onPress={() => false} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
    },
    formContainer: {
        flex:4,
        justifyContent: 'center',
    },
    buttonContainer: {
        flex:1,
    },
    input: {
        fontSize: 20, 
        height: 45,
    }
});