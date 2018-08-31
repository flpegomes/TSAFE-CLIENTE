const INITIAL_STATE = {
    nome: 'Felipe',
    sobrenome: 'Gomes',
    email: 'felipe2@tsafe.com.br', 
    senha: '123456', 
    erroCadastro:'',
    erroLogin: '',
    loadingLogin: false,
    loadingCadastro: false,
    endereco: '',
    mostraListaEndereco: false,
    listaEnderecos: 
    [
        {
            primaryText: "Nenhum dado encontrado",
            secondaryText: "Você digitou o endereço certo?"
        }    
    ],
    enderecoSelecionado: null


}

import {
    MODIFICA_EMAIL,
    MODIFICA_NOME,
    MODIFICA_SENHA,
    MODIFICA_SOBRENOME,
    CADASTRO_USUARIO_ERRO,
    CADASTRO_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO, 
    LOADING_LOGIN,
    LOADING_CADASTRO,
    MODIFICA_ENDERECO,
    POPULA_ENDERECO_CADASTRO,
    SELECIONA_ENDERECO_LISTA_CADASTRO,
    MOSTRA_LISTA_ENDERECO,

} from '../Actions/Types';

export default (state = INITIAL_STATE, action) => {
    console.log(action.type)
    switch(action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email:action.payload  }
        case MODIFICA_SENHA:
            return { ...state, senha:action.payload }
        case MODIFICA_NOME:
            return { ...state, nome:action.payload }
        case MODIFICA_SOBRENOME:
            return { ...state, sobrenome:action.payload}
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
        case MODIFICA_ENDERECO:
            return { ...state, endereco: action.payload }
        case MOSTRA_LISTA_ENDERECO:
            if(action.payload === 'casa') {
                return { ...state, mostraListaEndereco: true } 
            }
        case POPULA_ENDERECO_CADASTRO: 
            return { ...state, listaEnderecos: action.payload }
        case SELECIONA_ENDERECO_LISTA_CADASTRO:
            return { ...state, enderecoSelecionado: action.payload, mostraListaEndereco:false, endereco: action.payload.name }
        default:
            return state;   
    }
}