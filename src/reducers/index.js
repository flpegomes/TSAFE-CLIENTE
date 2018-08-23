import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducers';
import AppReducer from './AppReducers';
import ListaContatosReducer from './ListaContatosReducer';
import ListaChatReducer from './ListaChatReducer';
import ListaConversasReducer from './ListaConversasReducer'

export default combineReducers({
    AutenticacaoReducer: AutenticacaoReducer,
    AppReducer: AppReducer,
    ListaContatosReducer: ListaContatosReducer,
    ListaChatReducer: ListaChatReducer,
    ListaConversasReducer: ListaConversasReducer
});