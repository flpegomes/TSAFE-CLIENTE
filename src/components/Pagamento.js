import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const Pagamento = ({ navigation }) => (
    <View style={styles.pagamentoContainer}>
        <Text style={styles.textContainer}>Pagamento kkk</Text>
        <Button 
            title="Ir para home "
            onPress= {() => navigation.navigate('Home')}
        />
    </View>
);


const styles = StyleSheet.create({
    pagamentoContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    textContainer: {
        color: '#fff',
    }
});

Pagamento.navigationOptions = {
    tabBarIcon: <Icon name="money" size={18} color="#999" />
}

export default Pagamento;