import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../Actions/AutenticacaoActions';

class Login extends Component {
    _autenticarUsuario() {
        const { email, senha } = this.props;
        this.props.autenticarUsuario({email, senha});
    }

    renderBtnAcessar() {
        if(this.props.loadingLogin) {
            return (
                <ActivityIndicator size='large'/>
            )
        }
        return (
            <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={() => this._autenticarUsuario()}
                    >
                    <Text style={styles.textButton}> ENTRAR </Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
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
                        value={this.props.email}
                        onChangeText={texto => this.props.modificaEmail(texto)}
                    />
                    <TextInput style={styles.input} 
                        placeholder="senha" 
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#999'
                        secureTextEntry={true}
                        value={this.props.senha}
                        onChangeText={texto => this.props.modificaSenha(texto)}


                    />
                        <View style={styles.msgErroContainer}> 
                            <Text style={styles.msgErro}>{this.props.erroLogin} </Text> 
                        </View> 
                        <TouchableHighlight onPress={() => Actions.Cadastro()}>
                            <Text style={styles.msgCadastro}>Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                        
                </View>        
                {this.renderBtnAcessar()}
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
        borderRadius: 50,
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
        borderRadius: 50,
        paddingHorizontal: 25,
        color:'#fff'
          
    },
    msgCadastro: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 20,
        color: '#f9dc36',
        
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
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loadingLogin: state.AutenticacaoReducer.loadingLogin,
    }
)
export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(Login);
