import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../Actions/AutenticacaoActions';

class cadastro extends Component {

    _cadastraUsuario() {

        const { nome, email, senha} = this.props;
        this.props.cadastraUsuario({nome, email, senha});
    }
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.formContainer}>
                <TextInput 
                    placeholder="nome" 
                    value={this.props.nome}
                    onChangeText={texto => (this.props.modificaNome(texto))}
                    style={styles.input}
                    underlineColorAndroid='transparent'    
                    placeholderTextColor='#999'
                />
                <TextInput 
                    placeholder="email" 
                    value={this.props.email}
                    onChangeText={texto => (this.props.modificaEmail(texto))}
                    style={styles.input}
                    underlineColorAndroid='transparent'    
                    placeholderTextColor='#999'
                />
                <TextInput 
                    placeholder="senha" 
                    value={this.props.senha}
                    onChangeText={texto => (this.props.modificaSenha(texto))}
                    secureTextEntry={true}
                    style={styles.input}
                    underlineColorAndroid='transparent'    
                    placeholderTextColor='#999'
                />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this._cadastraUsuario()}>
                        <Text style={styles.textButton}> CADASTRAR </Text>
                </TouchableOpacity>
            </View> 
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        padding: 20,
        backgroundColor: '#323232'
    },
    formContainer: {
        flex:4,
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#f9dc36',
        borderRadius: 3,
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
        borderRadius: 3,
        paddingHorizontal: 15,
        color:'#fff'
    }
});

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha
    }
)

export default connect(mapStateToProps, { cadastraUsuario, modificaEmail, modificaSenha, modificaNome })(cadastro);