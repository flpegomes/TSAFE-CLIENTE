import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import RNGooglePlaces from 'react-native-google-places';


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
        MODIFICA_SOBRENOME,
        MODIFICA_ENDERECO,
        MOSTRA_LISTA_ENDERECO,
        POPULA_ENDERECO_CADASTRO,
        SELECIONA_ENDERECO_LISTA_CADASTRO,
f
} from './Types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaEndereco = (texto) => {
    return {
        type: MODIFICA_ENDERECO,
        payload: texto
    }
}

export const modificaSobrenome = (texto) => {
    return {
        type: MODIFICA_SOBRENOME,
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


export const cadastraUsuario = ({nome, sobrenome, email, senha, enderecoSelecionado}) => {
    return dispatch => {

        const { latitude, longitude } = enderecoSelecionado;
        dispatch({ type: LOADING_CADASTRO });
        
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(user => {
            let emailB64 = b64.encode(email);
            firebase.database().ref(`/usuarios/${emailB64}`)
                .push({ nome, sobrenome, latitude_casa: latitude, longitude_casa: longitude })
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


export const mostraListaEnderecos = (texto) => {
    return {
        type: MOSTRA_LISTA_ENDERECO,
        payload: texto
    }
}

export const populaListaEndereco = (texto) => {
    return(dispatch) => {
        let userInput = texto;
        RNGooglePlaces.getAutocompletePredictions(userInput,
            {
                country:'BR'
            }
        )
        .then((results) => {
            dispatch({
                type: POPULA_ENDERECO_CADASTRO,
                payload: results               
            })
        })
        .catch((error) => console.log(error.message));
    }
}


export const selecionaEnderecoLista = (endereco) => {
    return(dispatch) => {
        RNGooglePlaces.lookUpPlaceByID(endereco)
        .then((results) => {
            dispatch({
                type: SELECIONA_ENDERECO_LISTA_CADASTRO,
                payload: results
            })
        })
    }
}