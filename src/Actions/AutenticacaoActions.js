import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';

import {
        MODIFICA_EMAIL,
        MODIFICA_NOME,
        MODIFICA_SENHA,
        CADASTRO_USUARIO_ERRO,
        CADASTRO_USUARIO_SUCESSO,
        LOGIN_USUARIO_ERRO,
        LOGIN_USUARIO_SUCESSO,
        LOADING_LOGIN,
        LOADING_CADASTRO,
        MODAL_VISIBLE,
        MODAL_INVISIBLE
} from './Types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

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

export const cadastraUsuario = ({nome, email, senha}) => {
    return dispatch => {

        dispatch({ type: LOADING_CADASTRO });

        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(user => {
            let emailB64 = b64.encode(email);
            firebase.database().ref(`/contatos/${emailB64}`)
                .push({ nome })
                .then(value => cadastroUsuarioSucesso(dispatch))
            
        })
        .catch(erro => cadastroUsuarioErro(erro, dispatch));
    }
}

const cadastroUsuarioSucesso = (dispatch) => { 
    dispatch ({ type: CADASTRO_USUARIO_SUCESSO });

    Actions.Login();
}

const cadastroUsuarioErro = (erro, dispatch) => { 
        dispatch ({ type: CADASTRO_USUARIO_ERRO , payload: erro.message });  

}

export const autenticarUsuario = ({email, senha}) => {
    
    return dispatch => {

        dispatch({type: LOADING_LOGIN})

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginUsuarioSucesso(dispatch))
            .catch(erro => loginUsuarioErro(dispatch, erro));
    }
}

const loginUsuarioSucesso = (dispatch) =>  {
    dispatch (
        {
            type: LOGIN_USUARIO_SUCESSO
        }
    );

    Actions.Principal();
}

const loginUsuarioErro = (dispatch, erro) =>  {
    dispatch (
        {
            type: LOGIN_USUARIO_ERRO,
            payload: erro.message
        }
    );
}