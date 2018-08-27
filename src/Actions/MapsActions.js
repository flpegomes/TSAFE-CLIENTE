import { 
        GET_LOCALIZACAO_USUARIO, 
        MODIFICA_DESTINO, 
        MODIFICA_ORIGEM, 
        TOGGLE_SEARCH_RESULT,
        GET_ENDERECO_PREDICT
    } from './Types';
import { Actions } from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';


export const getLocalizacaoUsuario = () => {
    return(dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords);
                dispatch({
                    type: GET_LOCALIZACAO_USUARIO,
                    payload: position.coords
                });
            },
            (error) => console.log(new Date(), error),
            {enableHighAccuracy: true, timeout: 10000}
        );  
    }
}

export const modificaOrigem = (texto) => {
    return {
        type: MODIFICA_ORIGEM,
        payload: texto
    }
}

export const modificaDestino = (texto) => {
    return {
        type: MODIFICA_DESTINO,
        payload: texto
    }
}

export const resultadoSearchBox = (texto) => {
    return {
        type: TOGGLE_SEARCH_RESULT,
        payload: texto
    }
}

export const getEnderecoPredict = () => {
    return(dispatch, store) => {
        let userInput = store().resultadoOrigem ? store().origem : store().destino;

        RNGooglePlaces.getAutocompletePredictions('05302-041',
            {
                country:'BR'
            }
        )
        .then((results) => {
            dispatch({
                type: GET_ENDERECO_PREDICT,
                payload: results               
            })

            console.log(results)
            }
        )
        .catch((error) => console.log(error.message));
    }
}