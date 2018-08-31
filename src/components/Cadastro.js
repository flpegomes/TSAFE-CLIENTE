import React, { Component } from 'react';
import { View, TextInput, Button, Dimensions, ListView, StyleSheet, TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modificaEmail, 
         modificaSenha, 
         modificaNome, 
         cadastraUsuario, 
         modificaSobrenome, 
         modificaEndereco,
         mostraListaEnderecos,
         populaListaEndereco,
         selecionaEnderecoLista,
        } from '../Actions/AutenticacaoActions';
import { Input, InputGroup, Icon, ListItem, Left, Body } from 'native-base';

const { height, width } = Dimensions.get('window');


class cadastro extends Component {

    
    _cadastraUsuario() {

        const { nome,sobrenome, email, senha, enderecoSelecionado } = this.props;
        this.props.cadastraUsuario({nome, sobrenome, email, senha, enderecoSelecionado});
        console.log(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.listaEnderecos);      
        if(!(this.props.endereco === nextProps.endereco)){
          this.props.populaListaEndereco(nextProps.endereco);   
        }       
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

    _selecionaEnderecoLista(placeID) {
        this.props.selecionaEnderecoLista(placeID);        
    }

    componentWillMount(){
        this.criaFonteDeDados(this.props.listaEnderecos);
    }

    criaFonteDeDados(listaEnderecos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.fonteDeDados = ds.cloneWithRows(listaEnderecos);
    }

    renderListaEnderecos () {
        if(this.props.mostraListaEndereco === true){
            return (
                <View style={styles.searchResultsWrapper}>
                <ListView
                    enableEmptySections
                    dataSource={this.fonteDeDados}
                    renderRow={(data) => {
                        return (
                        <View>
                            <ListItem button avatar 
                            onPress={() => this._selecionaEnderecoLista(data.placeID)}
                            >
                            <Left>
                                <Icon style={styles.leftIcon} name='location' type="EvilIcons" /> 
                            </Left>
                            <Body>
                                <Text style={styles.primaryText}>{data.primaryText}</Text>
                                <Text style={styles.secundaryText}>{data.secondaryText}</Text>
                            </Body>
                            </ListItem>
                        </View>
                        )  
                    }}                
                />
                </View>
            );
        }
        return (<View></View>);
    }
    
    
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.formContainer}>
                    <TextInput 
                        placeholder="Qual o seu nome?" 
                        value={this.props.nome}
                        onChangeText={texto => (this.props.modificaNome(texto))}
                        style={styles.input}
                        underlineColorAndroid='transparent'    
                        placeholderTextColor='#999'
                    />
                    <TextInput 
                        placeholder="E seu sobrenome?" 
                        value={this.props.sobrenome}
                        onChangeText={texto => (this.props.modificaSobrenome(texto))}
                        style={styles.input}
                        underlineColorAndroid='transparent'    
                        placeholderTextColor='#999'
                    />
                    <TextInput 
                        placeholder="Poderia nos informar um email válido?" 
                        value={this.props.email}
                        onChangeText={texto => (this.props.modificaEmail(texto))}
                        style={styles.input}
                        underlineColorAndroid='transparent'    
                        placeholderTextColor='#999'
                    />
                    <TextInput 
                        placeholder="Digite uma senha." 
                        value={this.props.senha}
                        onChangeText={texto => (this.props.modificaSenha(texto))}
                        secureTextEntry={true}
                        style={styles.input}
                        underlineColorAndroid='transparent'    
                        placeholderTextColor='#999'
                    />
                    <View style={styles.inputWrapper}>
                        <InputGroup>
                            <Icon name="search" size={15} color="#FF5E3A" />
                            <Input style={styles.inputSearch} 
                                placeholder="A onde você mora?"
                                onChangeText={texto => (this.props.modificaEndereco(texto))}
                                onFocus={() => this.props.mostraListaEnderecos('casa')}
                                value={this.props.endereco}
                                /> 
                        </InputGroup>
                     </View>
                </View>

                <View style={styles.msgErroContainer}> 
                    <Text style={styles.msgErro}>{this.props.erroCadastro} </Text> 
                </View>

                {this.renderListaEnderecos()}
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
        justifyContent: 'flex-start',
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
    },
    searchBox: {
      width: '100%',
    },
    inputWrapper: {
        height:45,
        paddingHorizontal: 15,
        marginTop:10,
        backgroundColor: '#444',
        borderRadius: 3,
    },
    inputSearch: {
        fontSize: 14,
        color: '#fff'
    },
    label: { 
        fontSize: 10,
        fontStyle: 'italic',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    },
    searchResultsWrapper: {
      bottom: 0,
      position: 'absolute',
      width: width,
      backgroundColor: '#fff',
      opacity: 0.9,
      borderRadius: 7,
      elevation: 5,
      maxHeight: 200,
    },
    primaryText: {
        fontWeight: 'bold',
        color: '#373737',
    },
    secondaryText: {
        fontStyle: 'italic',
        color: "#7D7D7D",
    },
    leftContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderLeftColor: '#7D7D7D',
    },
    leftIcon: {
        
        color: '#7D7D7D',
    },
    
});

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        sobrenome: state.AutenticacaoReducer.sobrenome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loadingCadastro: state.AutenticacaoReducer.loadingCadastro,
        endereco: state.AutenticacaoReducer.endereco,
        mostraListaEndereco: state.AutenticacaoReducer.mostraListaEndereco,
        listaEnderecos: state.AutenticacaoReducer.listaEnderecos,
        enderecoSelecionado: state.AutenticacaoReducer.enderecoSelecionado
    }
)

export default connect(mapStateToProps, { modificaSobrenome, 
                                          cadastraUsuario, 
                                          modificaEmail, 
                                          modificaSenha, 
                                          modificaNome, 
                                          modificaEndereco,
                                          mostraListaEnderecos,
                                          populaListaEndereco,
                                          selecionaEnderecoLista })(cadastro);

