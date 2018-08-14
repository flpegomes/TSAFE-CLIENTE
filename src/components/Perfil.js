import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'


const Perfil = () => (
    <View style={styles.perfilContainer}>
        <Text>Perfil haha</Text>
    </View>
);

const styles = StyleSheet.create({
    perfilContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

Perfil.navigationOptions = {
    tabBarIcon: <Icon name="user" size={18} color="#999" />
}

export default Perfil;