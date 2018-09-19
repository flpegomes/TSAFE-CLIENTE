import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Dimensions, ScrollView, ListView, TouchableHighlight, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated } from 'react-native-maps';
import { connect } from 'react-redux';
import { InputGroup, Input, Icon, List, ListItem, Left, Body } from 'native-base';
import MapViewDirections from 'react-native-maps-directions';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { 
        getLocalizacaoUsuario, 
        modificaOrigem, 
        modificaDestino, 
        resultadoSearchBox, 
        getEnderecoPredict, 
        getEnderecoSelecionado,
        calculaDistancia,
        getLocalizacaoCasa,
        atualizaRota,
        confirmaSolicitacao,
        cancelaSolicitacao,
        onDragEndLocalizacaoSelecionada } from '../Actions/MapsActions';

import {
      adicionaContato,
      selecionaTab
} from '../Actions/AppActions'



const { height, width } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const latitudeDelta= 0.0222;
const longitudeDelta = ASPECT_RATIO * latitudeDelta;


 class Mapa extends Component {

  _criaMark = (latitude, longitude) => {
    this.props.coordMark = new AnimatedRegion ({
      latitude,
      longitude
    })
  }

  _chatVigia = () => {
    this.props.adicionaContato('felipe1@tsafe.com.br');
    this.props.selecionaTab(3);
  }

  _renderBotao = (coordAtual) => {

    if(this.props.solicitado === false ) {
      return (
        <TouchableHighlight 
                    onPress={() => this.props.confirmaSolicitacao(this.props.origemEnderecoSelecionado, coordAtual, this.state.tempoMorador, this.state.tempoVigia)}
                    style={styles.btnConfirmar} 
                  >
                      <Text style={styles.txtConfirmar} >CONFIRMAR SOLICITAÇÃO</Text>
        </TouchableHighlight>
      )
    }
    else if(this.props.solicitado === true) {
      return (
        <TouchableHighlight 
          onPress={() => { this.props.cancelaSolicitacao() }}
          style={styles.btnConfirmar} 
        >
          <Text style={styles.txtConfirmar} >CANCELAR CONFIRMAÇÃO</Text>
        </TouchableHighlight>
      )
    }
  }

  _renderRotaVigia = (latitude, longitude) => {
    if(!(this.props.origemEnderecoSelecionado === null) && this.props.solicitado === true) {
      return (
        <MapViewDirections
        origin={`${latitude}, ${longitude}`}
        destination={`${this.props.origemEnderecoSelecionado.latitude}, ${this.props.origemEnderecoSelecionado.longitude}`}
        apikey='AIzaSyCCvLwYKMDVy2u6CqJl9zAdGOYpsvuVngM'
        strokeWidth={3}
        strokeColor="#323232"
        // onReady={(result) => {
        //       atualizaRota()              
        //    }
        // }
        
        onReady={(result) => {
          this.setState({tempoVigia: result.duration})
        }}

      />
      )
    }
    return null
          
  }

  _renderRotaMorador = (latitude, longitude) => {
    if(!(this.props.origemEnderecoSelecionado === null)) {
      return (
        <MapViewDirections
        origin={`${latitude}, ${longitude}`}
        destination={`${this.props.origemEnderecoSelecionado.latitude}, ${this.props.origemEnderecoSelecionado.longitude}`}
        apikey='AIzaSyCCvLwYKMDVy2u6CqJl9zAdGOYpsvuVngM'
        strokeWidth={3}
        strokeColor="#f9dc36"
        // onReady={(result) => {
        //       atualizaRota()              
        //    }
        // }
        onReady={(result) => {
          this.setState({ tempoMorador: result.duration})
        }}

      />
      )
    }
    return null
  }

  _renderMarkLocalizacaoSelecionada = () => {
    if(!(this.props.origemEnderecoSelecionado === null)){
      
      return (
        <MapView.Marker.Animated
              title= 'Localização selecionada'
              ref={marker => {this.marker = marker}}
              description= 'Clique para falar com o vigia.'
              image={require('../Images/mark_solicitacao.png')}
              draggable
              coordinate={{
                latitude: this.props.origemEnderecoSelecionado.latitude,
                longitude: this.props.origemEnderecoSelecionado.longitude,
              }}
              showsCalloutOnLoad
              onDragEnd={(e) => {
                this.props.onDragEndLocalizacaoSelecionada(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                this._criaMark(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
              }}        
              onPress={() => {console.log('abrir chat')}}
              onCalloutPress={() => this._chatVigia() }
        />
        
      )
    }
  } 


  componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados(nextProps.enderecos);      
    if(!(this.props.origem === nextProps.origem)){
      this.props.getEnderecoPredict(nextProps.origem, nextProps.region_latitude, nextProps.region_longitude);   
    }

    if(this.props.origemEnderecoSelecionado !== null) {
      if(this.props.origemEnderecoSelecionado.latitude !== nextProps.origemEnderecoSelecionado.latitude) {
        const coord = {
          latitude: nextProps.origemEnderecoSelecionado.latitude,
          longitude: nextProps.origemEnderecoSelecionado.longitude
        }

        this.marker._component.animateMarkerToCoordinate(
          coord,
          500
        )
      }
    }

    console.log(this.props);
   
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
    ],
    tempoVigia: '0',
    tempoMorador: '0',
    confirmaSolicitacao: false,
    coordMark: {
      latitude: 0,
      longitude: 0
    }


  }

  componentWillMount(){
    this.props.getLocalizacaoUsuario();
    this.props.getLocalizacaoCasa();
    this.criaFonteDeDados(this.props.enderecos);
  }

  _renderCasa(coordVigiaLatitude, coordVigiaLongitude) {
    if(!(this.props.longitudeCasa === null)) {
    return (
      <View>
        <MapView.Marker
              title= 'Casa'
              ref="a"
              description= 'Minha casa'
              image={require('../Images/teste7.png')}
              draggable
              coordinate={{
                latitude: this.props.latitudeCasa,
                longitude: this.props.longitudeCasa,
              }}
              showsCalloutOnLoad
          />
          

          <MapView.Marker
              title= 'Vigia'
              ref="a"
              description= 'Vigia Roger'
              image={require('../Images/mark_vigia.png')}
              draggable
              coordinate={{
                latitude: coordVigiaLatitude,
                longitude: coordVigiaLongitude,
              }}
              showsCalloutOnLoad
          />
        </View>
      )
    }
  }

  criaFonteDeDados(enderecos) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.fonteDeDados = ds.cloneWithRows(enderecos);
  }

  _enderecoSelecionado(placeID, resultadoOrigem, origem) {
    this.props.getEnderecoSelecionado(placeID, 
                                      resultadoOrigem, 
                                      origem,
                                    );        
  }


  _mapReady = () => {
    setTimeout(() => {
      this.props.statusBarHeight=1;
    },1500);
    setTimeout(() => {
      this.props.statusBarHeight=0;
    },1500);
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
    let coordVigia = {
      latitude: -23.5271216, 
      longitude: -46.7261788
    }

    let coordAtual = {
      latitude: this.props.region_latitude,
      longitude: this.props.region_longitude
    }

    return(
      <View style={{paddingTop: this.props.statusBarHeight, flex:1}}> 

      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          showMyLocationButton={true}
          ref={map => this.mapView = map}
          initialRegion={{
            latitude:  this.props.region_latitude,
            longitude: this.props.region_longitude,
            latitudeDelta,
            longitudeDelta,
          }}          
          onMapReady={this._mapReady}           
          showsPointsOfInterest={false}
          style={styles.mapView}
        >
          {this._renderCasa(coordVigia.latitude, coordVigia.longitude) }          
          {this._renderRotaVigia(coordVigia.latitude, coordVigia.longitude)}
          {this._renderRotaMorador(this.props.region_latitude, this.props.region_longitude)}
          {this._renderMarkLocalizacaoSelecionada()}

          
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
                    <Text style={styles.label}>Em que lugar irá chegar?</Text>
                    <InputGroup>
                        <Icon name="search" size={15} style={styles.iconSearch} type='FontAwesome' />
                        <Input style={styles.inputSearch} 
                            placeholderTextColor='#999'
                            placeholder="A onde você irá chegar?"
                            onChangeText={texto => (this.props.modificaOrigem(texto))}
                            onFocus={() => this.props.resultadoSearchBox('origem')}
                            value={this.props.origem}
                            /> 
                    </InputGroup>
                </View>
            </View>
             
              <View style={styles.confirmarContainer}>
                <View style={styles.tempoMoradorContainer}>
                  <Image source={require('../Images/morador_icone.png')} style={{ height: 20, width: 20}} />
                  <Text style={{fontWeight: 'bold', fontSize:14, color:'#323232'}}>{Math.round(this.state.tempoMorador) } min.</Text>
                </View>
                {this._renderBotao(coordAtual)}
                <View style={styles.tempoVigiaContainer}>
                  <Image source={require('../Images/vigia_icone.png')} style={{ height: 20, width: 20}} />
                  <Text style={{fontWeight: 'bold', fontSize:14, color:'#323232'}}>  {Math.round(this.state.tempoVigia)} min.</Text>
                </View>
              </View>
                     
            { this._renderListaEnderecos() }

      </View>
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
      right: 0,
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
        marginRight: 15,
        marginTop: 60,
        marginBottom: 0,
        backgroundColor: '#222',
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
        color:'#fff'
    },
    label: { 
        fontSize: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0,
        color: '#f9dc36',
        fontWeight: 'bold',
    },
    searchResultsWrapper: {
      bottom: 0,
      position: 'absolute',
      width: width,
      marginLeft:20,
      backgroundColor: '#fff',
      opacity: 0.9,
      borderRadius: 7,
      elevation: 5,
      maxHeight: 200,
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
        
        color: '#f9dc36',
    },
    distance: {
        fontSize: 12
    },
    btnConfirmar: {
        backgroundColor: '#f9dc36',
        flex:4,
        height: 35,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        opacity:0.9,
        elevation: 4,
        marginBottom: 20,

    },
    txtConfirmar: {
      color:'#323232',
      fontWeight: 'bold',
      fontSize: 14
    },
    iconSearch: {
      color: '#f9dc36',
    },
    confirmarContainer: {
      flexDirection: 'row',
      height:35,
      marginBottom:20
    },
    tempoMoradorContainer: {
      borderRadius:3, 
      width: 20,
      flex:2,
      backgroundColor: "#fff",
      marginHorizontal: 10,
      elevation:4,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    tempoVigiaContainer: {
      borderRadius:3, 
      width: 20,
      flex:2,
      marginHorizontal: 10,
      elevation:4,
      backgroundColor: "#fff",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    }
}); 


const mapStateToProps = state => (
  {
    
      origemEnderecoSelecionado: state.MapsReducer.origemEnderecoSelecionado,
      region_latitude: state.MapsReducer.region_latitude,
      region_longitude: state.MapsReducer.region_longitude,
      origem: state.MapsReducer.origem,
      resultadoOrigem: state.MapsReducer.resultadoOrigem,
      resultadoDestino: state.MapsReducer.resultadoDestino,
      latitudeCasa: state.MapsReducer.latitudeCasa,
      longitudeCasa: state.MapsReducer.longitudeCasa,
      statusBarHeight: state.MapsReducer.statusBarHeight,
      distanciaMoradorCasa: state.MapsReducer.distanciaMoradorCasa,
      tempoRotaMorador: state.MapsReducer.tempoRotaMorador,
      tempoRotaVigia: state.MapsReducer.tempoRotaVigia,
      region: state.MapsReducer.region,
      solicitado: state.MapsReducer.solicitado,
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
                                          calculaDistancia,
                                          getLocalizacaoCasa,
                                          atualizaRota,
                                          confirmaSolicitacao,
                                          cancelaSolicitacao,
                                          onDragEndLocalizacaoSelecionada,
                                          adicionaContato,
                                          selecionaTab })(Mapa);