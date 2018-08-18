import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (
    <View style={styles.container}> 
        <View style={styles.titleContainer}>
            <Image 
                source={require('../Images/teste2.png')}
                style={{width: 335, height: 136, marginRight: 30}}
            />
        </View>
        <View style={styles.formContainer}>
            <TextInput style={styles.input} 
                placeholder="email" 
                underlineColorAndroid='transparent'    
                placeholderTextColor='#999'
            />
            <TextInput style={styles.input} 
                placeholder="senha" 
                underlineColorAndroid='transparent'
                placeholderTextColor='#999'
                secureTextEntry={true}

            />
            <TouchableHighlight onPress={() => Actions.Cadastro()}>
                <Text style={styles.msgCadastro}>Ainda não tem cadastro? Cadastre-se</Text>
            </TouchableHighlight>
        </View>        
        <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.textButton}> ENTRAR </Text>
        </TouchableOpacity>

    </View>

);

const styles = StyleSheet.create({
    container: {
        flex:1, 
        padding: 20,
        backgroundColor: '#323232'
    },
    titleContainer: {
        flex:3, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontSize:25, 
        color: '#f9dc36',
    },
    formContainer: {
        flex:2,

    },
    buttonContainer: {
        backgroundColor: '#f9dc36',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center' ,
        height: 45
    },
    textButton: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    input: {
        fontSize: 14,
        height: 45,
        backgroundColor: '#444',
        marginTop: 10,
        borderRadius: 5,
        paddingHorizontal: 15,
        color:'#fff'
          
    },
    msgCadastro: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 20,
        color: '#f9dc36',
    }
});
