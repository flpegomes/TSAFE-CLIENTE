import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken('pk.eyJ1IjoiZmxwZTciLCJhIjoiY2prdmI4ZnJvMGU4ZTNrbnh6cW81eTZwNCJ9.tZPofkfClB5nc0-18e8ksQ');


export default class Mapa extends Component {
    renderAnnotations() {
      return (
        <MapboxGL.PointAnnotation
          id='rocketseat'
          coordinate={[-46.71346979, -23.63245859]}
        >
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFill} />
          </View>
          <MapboxGL.Callout title='Rocketseat House' />
        </MapboxGL.PointAnnotation>
      )
    }
  
    render() {
      return (
        <MapboxGL.MapView
          centerCoordinate={[-46.71346979, -23.63245859]}
          style={styles.container}
          showUserLocation
          styleURL={MapboxGL.StyleURL.Dark}
          showUserLocation={true}
        >
        {this.renderAnnotations()}
        </MapboxGL.MapView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    annotationContainer: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 15,
    },
    annotationFill: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#7159C1',
      transform: [{ scale: 0.8 }],
    }
  });