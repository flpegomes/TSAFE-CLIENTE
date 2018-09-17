const INITIAL_STATE = {
    modalVisible: false,
    adicionar_contato: '',
    adicionar_contato_erro: '',
    mensagem:'',
    scroll: 'N',
};

import {
    MODAL_INVISIBLE,
    MODAL_VISIBLE,
    MODIFICA_CONTATO,
    ADICIONAR_CONTATO_ERRO,
    ADICIONAR_CONTATO_SUCESSO,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM_SUCESSO
} from '../Actions/Types';

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODAL_VISIBLE:
            return { ...state, modalVisible: true }
        case MODAL_INVISIBLE: 
            return { ...state, modalVisible: false, adicionar_contato: '', adicionar_contato_erro: '' }
        case MODIFICA_CONTATO: 
            return { ...state, adicionar_contato: action.payload }
        case ADICIONAR_CONTATO_ERRO:
            return { ...state, adicionar_contato_erro: action.payload }
        case ADICIONAR_CONTATO_SUCESSO:
            return { ...state, adicionar_contato: '', adicionar_contato_erro: action.payload } 
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload, scroll: 'N' }
        case ENVIA_MENSAGEM_SUCESSO:
            return { ...state, mensagem: '', scroll: 'S' }

        default:
            return state;
    }
}