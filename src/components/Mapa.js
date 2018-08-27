import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Dimensions, ScrollView  } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { height, width } = Dimensions.get('window');


export default class Mapa extends Component {
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
   render() {
    const { latitude, longitude, mark } = this.state.places[0];

    return(
      <View style={styles.container}>
        <MapView
          ref={map => this.mapView = map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.0231,
          }}
          onMapReady={this._mapReady}

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
    }
}); 