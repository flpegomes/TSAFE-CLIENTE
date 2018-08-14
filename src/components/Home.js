import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

const Home = ({ navigation }) => (
    <View style={styles.homeContainer}>
        <Text style={styles.textContainer}>Home xd</Text>
        <Button 
            title="Ir para perfil "
            onPress= {() => navigation.navigate('Perfil')}
        />
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