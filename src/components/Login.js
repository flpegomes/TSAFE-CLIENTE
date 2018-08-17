import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
    <View style={styles.container}> 
        <View style={styles.titleContainer}>
            <Text style={styles.textTitle}> LOGIN </Text>
        </View>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Senha" />
            <TouchableHighlight onPress={() => Actions.Cadastro()}>
                <Text style={{fontSize: 14}}>Ainda não tem cadastro? Cadastre-se</Text>
            </TouchableHighlight>
        </View>        
        <View style={styles.buttonContainer}>
            <Button title="Acessar" color='#333' onPress={() => false} />
        </View>

    </View>

);

const styles = StyleSheet.create({
    container: {
        flex:1, 
        padding: 10,
    },
    titleContainer: {
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize:25, 
    },
    formContainer: {
        flex:2,
    },
    buttonContainer: {
        flex: 2,
    },
    input: {
        fontSize: 20,
        height: 45,
    }
});
