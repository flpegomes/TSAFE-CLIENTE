const INITIAL_STATE = {
    nome: '',
    email: 'G@g.com.br', 
    senha: '123456', 
    erroCadastro:'',
    erroLogin: '',
    loadingLogin: false,
    loadingCadastro: false,
    modalVisible: false,
}

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
    MODAL_INVISIBLE,
} from '../Actions/Types';

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload  }
        case MODIFICA_SENHA:
            return { ...state, senha:action.payload }
        case MODIFICA_NOME:
            return { ...state, nome:action.payload }
        case CADASTRO_USUARIO_ERRO: 
            return { ...state, erroCadastro:action.payload, loadingCadastro: false }
        case CADASTRO_USUARIO_SUCESSO: 
            return {...state, nome:'', senha:'', erroCadastro: '', loadingCadastro: false }
        case LOGIN_USUARIO_ERRO: 
            return { ...state, erroLogin: action.payload, loadingLogin: false }
        case LOADING_LOGIN:
            return { ...state, loadingLogin: true }
        case LOADING_CADASTRO: 
            return { ...state, loadingCadastro: true }
        case MODAL_VISIBLE:
            return { ...state, modalVisible: true}
        case MODAL_INVISIBLE: 
            return { ...state, modalVisible: false}
        default:
            return state;   
    }
}