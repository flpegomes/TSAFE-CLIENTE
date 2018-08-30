import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Dimensions, ScrollView, ListView, TouchableHighlight } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { InputGroup, Input, Icon, List, ListItem, Left, Body } from 'native-base';

import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { 
        getLocalizacaoUsuario, 
        modificaOrigem, 
        modificaDestino, 
        resultadoSearchBox, 
        getEnderecoPredict, 
        getEnderecoSelecionado,
        calculaDistancia } from '../Actions/MapsActions';



const { height, width } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const latitudeDelta= 0.0222;
const longitudeDelta = ASPECT_RATIO * latitudeDelta;

 class Mapa extends Component {


  componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados(nextProps.enderecos);      
    if(!(this.props.origem === nextProps.origem)){
      this.props.getEnderecoPredict(nextProps.origem);   
    }
    if(!(this.props.destino === nextProps.destino)){
      this.props.getEnderecoPredict(nextProps.destino);   
    }
   
  }



  state = {
    places: [
      {
        id: 1,
        title: 'VIGIA ROGER',
        description: 'Em ronda',
        latitude: -23.6536,
        longitude: -46.7251,
        mark:'',
        tipo:'v'
      },
      {
        id: 2,
        title: 'Morador Mauricio',
        description: 'Ronda solicitada',
        latitude: -23.6536,
        longitude: -46.7351,
        mark:'',
        tipo:'m'
      },
      {
        id: 3,
        title: 'Casa',
        description: 'O melhor lugar do mundo',
        latitude: -23.6636,
        longitude: -46.7251,
        mark:'',
        tipo:'m'
      }
    ]
  }

  componentWillMount(){
    this.props.getLocalizacaoUsuario();
    this.criaFonteDeDados(this.props.enderecos);
  }
  criaFonteDeDados(enderecos) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.fonteDeDados = ds.cloneWithRows(enderecos);
  }

  _enderecoSelecionado(placeID, resultadoOrigem, origem, destino) {
    this.props.getEnderecoSelecionado(placeID, 
                                      resultadoOrigem, 
                                      origem,
                                      destino
                                    );        
  }

  _calcularDistancia(origem, destino) {
    this.props.calculaDistancia(origem, destino);
  }

  _renderMarker(place, i) {
    if (this.state.places[i].tipo === 'v' ) {
      return (
      <MapView.Marker
      ref={ mark => place.mark = mark }
      title={place.title}
      description={place.description}
      key={ place.id }
      image={require('../Images/teste5.png')}
      draggable
      onDragEnd={(e) => {
            const state = this.state;
            state.places[i].latitude = e.nativeEvent.coordinate.latitude;
            state.places[i].longitude = e.nativeEvent.coordinate.longitude;
            this.setState(state);
          }
        }
      coordinate={{
        latitude: place.latitude,
        longitude: place.longitude,
      }}
    />
    )
    }

    else {
      return (
        <MapView.Marker
          ref={ mark => place.mark = mark }
          title={place.title}
          description={place.description}
          key={ place.id }
          draggable
          onDragEnd={(e) => {
                const state = this.state;
                state.places[i].latitude = e.nativeEvent.coordinate.latitude;
                state.places[i].longitude = e.nativeEvent.coordinate.longitude;
                this.setState(state);
          }}
          coordinate={{
            latitude: place.latitude,
            longitude: place.longitude,
          }}
         />
    )
    }
  }

  _mapReady = () => {
    this.state.places[0].mark.showCallout();
  }

  _renderListaEnderecos() {
    if(this.props.resultadoDestino === true || this.props.resultadoOrigem === true){
      return (
        <View style={styles.searchResultsWrapper}>
          <ListView
              enableEmptySections
              dataSource={this.fonteDeDados}
              renderRow={(data) => {
                return (
                  <View>
                    <ListItem button avatar 
                      onPress={() => this._enderecoSelecionado(data.placeID, 
                                                               this.props.resultadoOrigem,
                                                               this.props.origemEnderecoSelecionado,
                                                               this.props.destinoEnderecoSelecionado
                                                            )}
                    >
                      <Left>
                          <Icon style={styles.leftIcon} name='location' type="EvilIcons" /> 
                      </Left>
                      <Body>
                        <Text style={styles.primaryText}>{data.primaryText}</Text>
                        <Text style={styles.secundaryText}>{data.secondaryText}</Text>
                      </Body>
                    </ListItem>
                  </View>
                )  
              }}                
          />
        </View>
      );
    }
    return (<View></View>);
  }
   render() {

    return(
      
      <View style={styles.container}>
      
        <MapView
          ref={map => this.mapView = map}
          initialRegion={{
            latitude:  this.props.region_latitude,
            longitude: this.props.region_longitude,
            latitudeDelta,
            longitudeDelta,
          }}
          onMapReady={this._mapReady}
          showsUserLocation={true}
				showsMyLocationButton={true}

          style={styles.mapView}
        >
          {this.state.places.map((place, i) => (
            this._renderMarker(place, i)
          ))}
        </MapView>
        {/* <ScrollView 
          style={styles.placesContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={e => {
              const scrolled = e.nativeEvent.contentOffset.x;
              const place = (scrolled > 0 )
                ? Math.round(scrolled / Dimensions.get('window').width)
                : 0;

                const { latitude, longitude, mark } = this.state.places[place];

                this.mapView.animateToCoordinate({
                  latitude,
                  longitude
                }, 1000);

                setTimeout(() => {
                    mark.showCallout();
                }, 1000);

          }}
        >
            { this.state.places.map(place => (
                <View  key={place.id} style={styles.place}>
                  <Text>{place.longitude}</Text>
                  <Text>{place.latitude}</Text>
                </View>
            ))}            
        </ScrollView> */}
            
        <View style={styles.searchBox}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}> Origem </Text>
                    <InputGroup>
                        <Icon name="search" size={15} color="#FF5E3A" />
                        <Input style={styles.inputSearch} 
                            placeholder="A onde você irá chegar?"
                            onChangeText={texto => (this.props.modificaOrigem(texto))}
                            onFocus={() => this.props.resultadoSearchBox('origem')}
                            value={this.props.origem}
                            /> 
                    </InputGroup>
                </View>
                <View style={styles.secondInputWrapper}>
                    <Text style={styles.label}> Destino </Text>
                    <InputGroup>
                        <Icon name="search" size={15} color="#FF5E3A" />
                        <Input style={styles.inputSearch} 
                            placeholder="Para onde deseja ir?"
                            onChangeText={texto => (this.props.modificaDestino(texto))}
                            onFocus={() => this.props.resultadoSearchBox('destino')}
                            value={this.props.destino}
                            /> 
                         
                    </InputGroup>
                </View>
            </View>



            <TouchableHighlight 
              onPress={() => {
                        this._calcularDistancia(this.props.origemEnderecoSelecionado, this.props.destinoEnderecoSelecionado)
                        console.log(this.props)
                      }}
              style={styles.btnConfirmar}
            >
                <Text style={styles.txtConfirmar} >CONFIRMAR SOLICITAÇÃO</Text>
            </TouchableHighlight>
                     
            { this._renderListaEnderecos() }

            
      </View>

    );
    
  }
}


const styles = StyleSheet.create({
    mapView: {
      position: 'absolute',
      top: 0,
      left: 0, 
      bottom: 0, 
      right: 0
    },
    container: {
      flex:1, 
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    placesContainer: {
        width: '100%',
        maxHeight: 200,
    },
    place: {
      width: width -40,
      maxHeight: 200, 
      backgroundColor: '#fff',
      marginHorizontal: 20, 
    },
    searchBox: {
      top: 0,
      position: 'absolute',
      width: '100%',
    },
    inputWrapper: {
        marginLeft: 15, 
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius: 7,
    },
    secondInputWrapper: {
        marginLeft: 15, 
        marginRight: 10,
        marginTop: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius: 7,
    },
    inputSearch: {
        fontSize: 14,
    },
    label: { 
        fontSize: 10,
        fontStyle: 'italic',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    },
    searchResultsWrapper: {
      bottom: 0,
      position: 'absolute',
      width: width,
      marginLeft:20,
      backgroundColor: '#fff',
      opacity: 0.9,
      borderRadius: 7,
      elevation: 5
    },
    primaryText: {
        fontWeight: 'bold',
        color: '#373737',
    },
    secondaryText: {
        fontStyle: 'italic',
        color: "#7D7D7D",
    },
    leftContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderLeftColor: '#7D7D7D',
    },
    leftIcon: {
        
        color: '#7D7D7D',
    },
    distance: {
        fontSize: 12
    },
    btnConfirmar: {
        backgroundColor: '#f9dc36',
        width: 200,
        height: 35,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        opacity:0.9,
        elevation: 4,
        marginBottom:20,

    },
    txtConfirmar: {
      color:'#323232',
      fontWeight: 'bold',
      fontSize: 14
    }

    
}); 


const mapStateToProps = state => (
  {
    
      origemEnderecoSelecionado: state.MapsReducer.origemEnderecoSelecionado,
      destinoEnderecoSelecionado: state.MapsReducer.destinoEnderecoSelecionado,
      region_latitude: state.MapsReducer.region_latitude,
      region_longitude: state.MapsReducer.region_longitude,
      origem: state.MapsReducer.origem,
      destino: state.MapsReducer.destino,
      resultadoOrigem: state.MapsReducer.resultadoOrigem,
      resultadoDestino: state.MapsReducer.resultadoDestino,
      distanciaMoradorCasa: state.MapsReducer.distanciaMoradorCasa,
      enderecos: _.map(state.MapsReducer.enderecos, (val, uid) => {
        return { ...val, uid}
      })   
  }
)
export default connect(mapStateToProps, { 
                                          getLocalizacaoUsuario, 
                                          modificaDestino, 
                                          modificaOrigem, 
                                          resultadoSearchBox, 
                                          getEnderecoPredict, 
                                          getEnderecoSelecionado,
                                          calculaDistancia })(Mapa);