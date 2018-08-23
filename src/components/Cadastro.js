import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario, modificaSobrenome } from '../Actions/AutenticacaoActions';

class cadastro extends Component {

    _cadastraUsuario() {

        const { nome,sobrenome, email, senha} = this.props;
        this.props.cadastraUsuario({nome, sobrenome, email, senha});
    }

    renderBtnCadastrar() {
        if(this.props.loadingCadastro) {
            return (
                <ActivityIndicator size='large' />
            )        
        }
        
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this._cadastraUsuario()}>
                        <Text style={styles.textButton}> CADASTRAR </Text>
            </TouchableOpacity>
        )
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
                    placeholder="sobrenome" 
                    value={this.props.sobrenome}
                    onChangeText={texto => (this.props.modificaSobrenome(texto))}
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
                <View style={styles.msgErroContainer}> 
                    <Text style={styles.msgErro}>{this.props.erroCadastro} </Text> 
                </View>
                </View>
                {this.renderBtnCadastrar()}
                
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
    },
    msgErro: {
        color: '#ff0000',
        fontSize: 12,
    },
    msgErroContainer: {
        marginTop: 10,
        borderRadius: 3,
       // backgroundColor: '#222'
       alignItems:'flex-end'
    }
});

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        sobrenome: state.AutenticacaoReducer.sobrenome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loadingCadastro: state.AutenticacaoReducer.loadingCadastro,
    }
)

export default connect(mapStateToProps, { modificaSobrenome, cadastraUsuario, modificaEmail, modificaSenha, modificaNome })(cadastro);

