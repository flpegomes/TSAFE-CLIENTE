import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Dimensions, ScrollView  } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { InputGroup, Input, Icon, List, ListItem, Left } from 'native-base';

import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { getLocalizacaoUsuario, modificaOrigem, modificaDestino, resultadoSearchBox, getEnderecoPredict } from '../Actions/MapsActions';



const { height, width } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const latitudeDelta= 0.0422;
const longitudeDelta = ASPECT_RATIO * latitudeDelta;

 class Mapa extends Component {

  componentDidMount() {

    this.props.getEnderecoPredict();
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
            console.log(place);
            console.log(this.state.places)
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
            console.log(place);
            console.log(this.state.places)
          }
        }
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

    console.log('render');
    console.log(`${this.props.resultadoOrigem} aaaa ${this.props.resultadoDestino}`)
    console.log(this.props.enderecos)
    if( this.props.resultadoDestino == true || this.props.resultadoOrigem == true ){
      return (
        <View style={styles.searchResultsWrapper}>
        <List>
            <ListItem button avatar>
                <Left>
                    <Icon style={styles.leftIcon} name='location' type="EvilIcons" /> 
                </Left>
                <Text>1</Text>
            </ListItem>
            <ListItem>
                <Text>1</Text>
            </ListItem>
        </List>
    </View>
      )
    }else{
      return null;
    }
 
  }
   render() {
    const { latitude, longitude, mark } = this.state.places[0];

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
        <ScrollView 
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
        </ScrollView>
            
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
                            placeholder="Onde fica seu destino? "
                            onChangeText={texto => (this.props.modificaDestino(texto))}
                            value={this.props.destino}
                            onFocus={() => this.props.resultadoSearchBox('destino')}
                            /> 
                         
                    </InputGroup>
                </View>
            </View>
            {this._renderListaEnderecos()}
                     
            
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
      alignItems: 'flex-end',
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
      top: 160,
      position: 'absolute',
      width: '100%',
      height:1000,
      backgroundColor: '#fff',
      opacity: 0.9
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
        fontSize: 28,
        color: '#7D7D7D',
    },
    distance: {
        fontSize: 12
    }
    
}); 


const mapStateToProps = state => (
  {
      region_latitude: state.MapsReducer.region_latitude,
      region_longitude: state.MapsReducer.region_longitude,
      origem: state.MapsReducer.origem,
      destino: state.MapsReducer.destino,
      resultadoOrigem: state.MapsReducer.resultadoOrigem,
      resultadoDestino: state.MapsReducer.resultadoDestino,
      enderecos: state.MapsReducer.enderecos 
  }
)
export default connect(mapStateToProps, { getLocalizacaoUsuario, modificaDestino, modificaOrigem, resultadoSearchBox, getEnderecoPredict })(Mapa);