import React from 'react';
import { View, Button, Text, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Mapa from './Mapa';


const Home = ({ navigation }) => (
    <View>

    <Mapa />
    </View>
);


const styles = StyleSheet.create({
    homeContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    textContainer: {
        color: '#fff',
    }
});

Home.navigationOptions = {
    tabBarIcon: <Icon name="home" size={18} color="#999" />
}

export default Home;