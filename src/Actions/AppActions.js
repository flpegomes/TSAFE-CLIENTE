import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import _ from 'lodash';

import {
    MODAL_VISIBLE,
    MODAL_INVISIBLE,
    MODIFICA_CONTATO,
    ADICIONAR_CONTATO_ERRO,
    ADICIONAR_CONTATO_SUCESSO,
    LISTA_USUARIO_CONTATO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSAS_USUARIO,
    ATUALIZA_TAB
} from './Types';


export const mostrarModal = () => {
    return {
        type: MODAL_VISIBLE,
    }
}

export const esconderModal = () => {
    return {
        type: MODAL_INVISIBLE,
    }
}

export const modificaContato = (texto) => {
    return {
        type: MODIFICA_CONTATO,
        payload: texto
    }
} 

export const adicionaContato = email => {
    if(email===''){
        return dispatch => {
            adicionaContatoErro('Preencha o campo!', dispatch);
        }
    }
    return dispatch => {
        let emailb64 = b64.encode(email);
        firebase.database().ref(`/usuarios/${emailb64}`)
        .once('value')
        .then(snapshot => {
            if(snapshot.val()) {
               const dadosUsuario = _.first(_.values(snapshot.val()));
               const { currentUser } = firebase.auth();
               let emailUsuarioB64 = b64.encode(currentUser.email);

               firebase.database().ref(`usuario_contatos/${emailUsuarioB64}`).orderByKey().once('value', (snapshot) => {
                if (snapshot.exists()) {
                    adicionaContatoErro('Contato já existente.', dispatch);
                } else {
                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                    .push({ email, nome: dadosUsuario.nome })
                    .then(() => adicionaContatoSucesso('Contato adicionado.', dispatch))
                    .catch(erro => adicionaContatoErro(erro.message, dispatch))
                }
              }).catch()

               
            } else {
                dispatch({ 
                           type: ADICIONAR_CONTATO_ERRO, 
                           payload: 'Email não existe.'   
                        })
            }
        })
        .catch()
    }
    
}


const adicionaContatoErro = (erro, dispatch) => (
    dispatch({ 
        type: ADICIONAR_CONTATO_ERRO, 
        payload: erro  
     })
)

const adicionaContatoSucesso = (sucesso, dispatch) => {
    dispatch({
        type: ADICIONAR_CONTATO_SUCESSO,
        payload: sucesso
    })
}

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_USUARIO_CONTATO, payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = texto => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: texto,
    })
}

export const enviaMensagem = (mensagem, contatoNome, contatoEmail ) => {
    return (dispatch) => {

        const { currentUser } = firebase.auth();
        const usuarioEmail = currentUser.email;
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);
        
        if(mensagem === '')
        {

        } else {

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem, tipo: 'r' })
                    .then(() => dispatch ({ type: ENVIA_MENSAGEM_SUCESSO }))
            })
            .then(() => {
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome , email: contatoEmail })
            })
            .then(() => {
                firebase.database().ref(`/usuarios/${usuarioEmailB64}`)
                    .once("value")
                    .then(snapshot => {

                        const dadosUsuario = _.first(_.values(snapshot.val()));

                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                         .set({ nome: dadosUsuario.nome, email: usuarioEmail })
                    })
            })
        }
    } 
}

export const conversaUsuarioFetch = (contatoEmail) => {
    let usuarioEmailB64;
    let contatoEmailB64 = b64.encode(contatoEmail);
    
    const { currentUser } = firebase.auth();

    usuarioEmailB64 = b64.encode(currentUser.email)

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on("value", snapshot => {
                dispatch ({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
            })
    }    

}

export const conversasUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let usuarioEmailB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() })
            })
    }
}

export const selecionaTab = (tab) => {
    return {
        type: ATUALIZA_TAB,
        payload: tab
    }
}