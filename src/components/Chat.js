import React, { Component } from 'react';
import { View, Keyboard,Text, StyleSheet, TextInput, Image, TouchableHighlight, ListView } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modificaMensagem, enviaMensagem, conversaUsuarioFetch, atualizaScroll } from '../Actions/AppActions';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.scroll = null;
    }
    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);

    }

    componentWillReceiveProps(nextProps) {
        if(this.props.contatoEmail !== nextProps.contatoEmail) {
            this.props.conversaUsuarioFetch(nextProps.contatoEmail);
        }
        this.criaFonteDeDados(nextProps.conversa);
    }


    _enviaMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;
        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    criaFonteDeDados(conversa) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.dataSource = ds.cloneWithRows(conversa);
    }

    renderRow(texto) {
        if(texto.tipo === 'e') {
            return (
                <View style={styles.containerMsgEnviada}>
                    <Text style={styles.textoMensagemEnviada}>{texto.mensagem}
                        <Text note style={styles.msgHorarioEnviada}>          11:44</Text>
                    </Text>
                </View>
            )
        }
        return (
            <View style={styles.containerMsgRecebida}>
                    <Text style={styles.textoMensagemRecebida}>{texto.mensagem}
                        <Text note style={styles.msgHorarioRecebida}>          11:44</Text>
                    </Text>

                </View>
        )
    }

    render() {
        return (
                <View style={styles.containerChat}>
                    <View style={styles.containerMensagem}>
                        <ListView
                            enableEmptySections
                            dataSource={this.dataSource}
                            renderRow={this.renderRow}
                            ref={ ( ref ) => this.scrollView = ref }
                            onContentSizeChange={ () => {        
                                this.scrollView.scrollToEnd( { animated: true } )
                            } }                        
                        />
                    </View>    
                    <View style={styles.containerInput}>
                        <TextInput 
                            style={styles.input}
                            value={this.props.mensagem}
                            onChangeText={(texto) => this.props.modificaMensagem(texto) }
                            placeholder='Digite sua mensagem aqui...'    
                        />
                        <TouchableHighlight onPress={this._enviaMensagem.bind(this)}>
                            <Icon style={styles.icon} type="FontAwesome" name="send" />
                        </TouchableHighlight>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    containerChat: {
        flex:1, 
        backgroundColor: '#323232',
        padding: 10
    },
    containerMensagem: {
        flex:1,
        paddingBottom: 20,
    },
    containerInput: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',


    },
    input: {
        flex: 4, 
        fontSize: 14,
        borderRadius: 3,
        backgroundColor: "#fff",
        marginRight: 5,
    },
    icon: {
        color:'#fadf63',
        paddingHorizontal: 10,
    },
    containerMsgRecebida: {
        alignItems: 'flex-start',
        marginTop: 5, 
        marginBottom: 5, 
        marginRight: 40,
    },
    containerMsgEnviada: {
        alignItems: 'flex-end', 
        marginTop: 5, 
        marginBottom: 5, 
        marginLeft: 40,

    },
    textoMensagemRecebida: {
        fontSize: 14, 
        color: '#000', 
        padding: 10, 
        backgroundColor:'#fadf63',
        borderRadius: 3,
        paddingRight: 10,
    },
    textoMensagemEnviada: {
        fontSize: 14,
        color: '#000',
        padding: 10,
        backgroundColor:'#fff',
        borderRadius: 3,
        paddingRight: 10,
        
    },
    msgHorarioEnviada: {
        fontSize: 10,
        color:'#878787',
        fontWeight: 'bold'
    },
    msgHorarioRecebida: {
        fontSize: 10,
        color:'#878787',
        fontWeight: 'bold',
    },

})

mapStateToProps = state => {
    const conversa = _.map(state.ListaChatReducer, (val, uid) => {
        return { ...val, uid };
    });
    return ({
        mensagem: state.AppReducer.mensagem,
        conversa: conversa,
        scroll: state.AppReducer.scroll

    })
}

export default connect(mapStateToProps, { modificaMensagem, enviaMensagem, conversaUsuarioFetch, atualizaScroll })(Chat);