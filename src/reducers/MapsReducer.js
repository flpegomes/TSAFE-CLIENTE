const INITIAL_STATE = {
    region_latitude: 0,
    region_longitude: 0,
    origem: '',
    destino: '',
    resultadoDestino: false,
    resultadoOrigem: false,
    distanciaMoradorCasa: null,
    enderecos: 
        [
            {
                primaryText: "Nenhum dado encontrado",
                secondaryText: "Você digitou o endereço certo?"
            }    
        ],
    origemEnderecoSelecionado : null,
    destinoEnderecoSelecionado : null,
    longitudeCasa: null,
    latitudeCasa: null,
    statusBarHeight: 0,
    tempoRotaMorador: "00:00",
    tempoRotaVigia: "00:00",
    solicitado: false,
};

import { 
        GET_LOCALIZACAO_USUARIO, 
        MODIFICA_ORIGEM, 
        MODIFICA_DESTINO, 
        TOGGLE_SEARCH_RESULT, 
        GET_ENDERECO_PREDICT,
        GET_ENDERECO_SELECIONADO_ORIGEM,
        GET_ENDERECO_SELECIONADO_DESTINO,
        GET_DISTANCIA_MATRIX,
        GET_LOCALIZACAO_CASA,
        ATUALIZA_ROTA,
        ATUALIZA_ROTA_VIGIA,
        CONFIMAR_SOLICITACAO,
        CANCELAR_SOLICITACAO

    } from '../Actions/Types';

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_LOCALIZACAO_USUARIO: 
            return { ...state, region_latitude: action.payload.latitude, region_longitude: action.payload.longitude }
        case MODIFICA_ORIGEM:
            return { ...state, origem: action.payload}
        case MODIFICA_DESTINO:
            return { ...state, destino: action.payload}
        case TOGGLE_SEARCH_RESULT:
            if(action.payload === 'origem') {
                return { ...state, resultadoOrigem: true, resultadoDestino: false}
            }
            else if(action.payload === 'destino') {
                return { ...state, resultadoDestino: true, resultadoOrigem: false}
            }
        case GET_ENDERECO_PREDICT: 
            return { ...state, enderecos: action.payload }
        case GET_ENDERECO_SELECIONADO_ORIGEM:
            return { ...state, origemEnderecoSelecionado: action.payload, resultadoOrigem: false, origem: action.payload.name}
        case GET_ENDERECO_SELECIONADO_DESTINO:
            return { ...state, destinoEnderecoSelecionado: action.payload, resultadoDestino: false, destino: action.payload.name}
        case GET_DISTANCIA_MATRIX:
            return { ...state, distanciaMoradorCasa: action.payload}
        case GET_LOCALIZACAO_CASA:
            return { ...state, longitudeCasa: action.payload.longitude_casa, latitudeCasa : action.payload.latitude_casa}
        case ATUALIZA_ROTA:
            console.log(action.payload)
            return { ...state, tempoRotaMorador: action.payload }
        case ATUALIZA_ROTA_VIGIA:
            return { ...state, tempoRotaVigia: action.payload.duration }
        case CONFIMAR_SOLICITACAO:
            return { ...state, solicitado: true}
        case CANCELAR_SOLICITACAO:
            return { ...state, solicitado: false}
        default:
            return state;
    }

}