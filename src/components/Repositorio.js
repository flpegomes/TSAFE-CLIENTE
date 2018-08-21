import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default class Repositorio extends Component {
    render(){
        return (
            <View style={styles.repo}> 
                <Image 
                    style={styles.repositorioImage}
                    source={{uri: this.props.data.thumbnail}}
                />

                <View style={styles.repositorioInfo}>
                    <Text style={styles.repositorioTitle}> {this.props.data.title} </Text>
                    <Text style={styles.repositorioAuthor}> {this.props.data.author} </Text>
                </View>
            </View> 
        );
    }

}

const styles = StyleSheet.create({
    repo: {
        padding: 20,
        backgroundColor: '#FFF',
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
      },
      repositorioImage: {
          width: 50,
          height: 50,
          borderRadius: 25,
      },
      repositorioInfo: {
          marginLeft: 10,
      },
      repositorioTitle: {
          fontWeight: 'bold',
          color: '#333',
      },
      repositorioAuthor: {
          fontSize: 14,
          color: '#999',
      }
})