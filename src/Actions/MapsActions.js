import { 
        GET_LOCALIZACAO_USUARIO, 
        MODIFICA_DESTINO, 
        MODIFICA_ORIGEM, 
        TOGGLE_SEARCH_RESULT,
        GET_ENDERECO_PREDICT,
        GET_ENDERECO_SELECIONADO_ORIGEM,
        GET_ENDERECO_SELECIONADO_DESTINO,
        GET_DISTANCIA_MATRIX,
        GET_LOCALIZACAO_CASA,
        ATUALIZA_ROTA,
        ATUALIZA_ROTA_VIGIA
    } from './Types';

import { Actions } from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';
import request from '../util/Request';
import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

export const atualizaRota = (results) => {
    console.log(results)    
    return {
        type: ATUALIZA_ROTA,
        payload: results.duration
    }
} 

export const getLocalizacaoUsuario = () => {
    return(dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
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

export const getEnderecoPredict = (texto) => {
    return(dispatch) => {
        let userInput = texto;
        RNGooglePlaces.getAutocompletePredictions(userInput,
            {
                country:'BR'
            }
        )
        .then((results) => {
            dispatch({
                type: GET_ENDERECO_PREDICT,
                payload: results               
            })
        })
        .catch((error) => console.log(error.message));
    }
}

export const getEnderecoSelecionado = (endereco, resultadoOrigem) => {
    return(dispatch) => {
        RNGooglePlaces.lookUpPlaceByID(endereco)
        .then((results) => {
            if(resultadoOrigem)
            {
                dispatch({
                    type: GET_ENDERECO_SELECIONADO_ORIGEM,
                    payload: results
                })
            }
            else if(!resultadoOrigem){
                dispatch({
                    type: GET_ENDERECO_SELECIONADO_DESTINO,
                    payload: results
                 })
            }
        })
    }
}

export const calculaDistancia = (origem, destino) =>  {
    return dispatch => {
            request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                .query({
                    origins: origem.latitude + "," + origem.longitude,
                    destinations: destino.latitude + "," + destino.longitude,
                    mode:"driving",
                    key:"AIzaSyCCvLwYKMDVy2u6CqJl9zAdGOYpsvuVngM",
                })
                .finish((error, res) => {
                    dispatch({
                        type: GET_DISTANCIA_MATRIX,
                        payload: res.body
                    })
               })
    }
}

export const getLocalizacaoCasa = () => {
    const { currentUser } = firebase.auth();        
    return dispatch => {
        let usuarioEmailB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuarios/${usuarioEmailB64}`)
            .on("value", snapshot => {

                const dadosUsuario = _.first(_.values(snapshot.val()));

                dispatch({ type: GET_LOCALIZACAO_CASA, payload: dadosUsuario})
            })
    }
}

export const confirmarPedido = () => {
    return dispatch => {
        const { currentUser } = firebase.auth();
        let emailUsuarioB64 = b64.encode(currentUser.email);
        firebase.database().ref(`/usuario_pedidos/${emailUsuarioB64}`)
            .push({
                    chegada_endereco: origem.name,
                    chegada_latitude: origem.latitude,
                    chegada_longitude: origem.longitude,
                    
                    

            })

    }
}