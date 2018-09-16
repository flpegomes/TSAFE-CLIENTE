import React from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Icon } from 'native-base'
const Pagamento = ({ navigation }) => (
    <View style={styles.pagamentoContainer}>
            <View style={styles.tituloContainer}>
              <Text style={styles.titulo}>INFORMAÇÕES DO PAGAMENTO</Text>
            </View>
        <View style={styles.pagamentoFundo}> 
            <View style={styles.pagamentoRow}>
                <TextInput 
                    placeholder="XXXX-XXXX-XXXX-XXXX" 
                    onChangeText={texto => {}}
                    style={styles.inputNome}
                    underlineColorAndroid='transparent'    
                    placeholderTextColor='#999'
                />
            </View>
            <View style={styles.pagamentoRow}>
                <TextInput 
                    placeholder="Nome completo" 
                    onChangeText={texto => {}}
                    style={styles.inputNome}
                    underlineColorAndroid='transparent'    
                    placeholderTextColor='#999'
                />
            </View>
            <View style={styles.pagamentoRow}>
                <TextInput 
                    placeholder="MM/AAAA" 
                    onChangeText={texto => {}}
                    style={styles.input}
                    underlineColorAndroid='transparent'    
                    placeholderTextColor='#999'
                />
                <View style={{flex:2}}><Text> </Text></View>
                <TextInput 
                    placeholder="CVV" 
                    onChangeText={texto => {}}
                    style={styles.input}
                    underlineColorAndroid='transparent'    
                    placeholderTextColor='#999'
                />
            </View>
        </View>
        <View style={styles.pagamentoRow}>
                <TouchableHighlight 
                        onPress={() => {}}
                        style={styles.btnConfirmar} 
                    >
                            <Text style={styles.txtConfirmar} >CONFIRMAR PAGAMENTO</Text>
                </TouchableHighlight>
        </View>
    </View>
);


const styles = StyleSheet.create({
    pagamentoContainer: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#333',
        paddingTop: 20,

    },
    btnConfirmar: {
        backgroundColor: '#f9dc36',
        flex:4,
        height: 45,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        marginTop: 10,
    },
    titulo: {
        fontSize: 18,
        color:'#fff',
        fontWeight: 'bold'
    },
    textContainer: {
        color: '#fff',
    },
    pagamentoFundo: {
        height: 220,
        backgroundColor: '#222',
        borderRadius: 8,
        width: '90%',
        marginHorizontal: 10,
    },
    pagamentoRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent: 'flex-end'
    },
    pagamentoTitulo: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 14,
        height: 45,
        backgroundColor: '#444',
        marginTop: 10,
        borderRadius: 3,
        paddingHorizontal: 15,
        color:'#fff',
        width: 100,
        flex:1,
    },
    txtConfirmar: {
        color:'#323232',
        fontWeight: 'bold',
        fontSize: 14
    },
    inputNome: {
        fontSize: 14,
        height: 45,
        backgroundColor: '#444',
        marginTop: 10,
        borderRadius: 3,
        paddingHorizontal: 15,
        color:'#fff',
        flex:1,
    },
    icon: {
        color: '#333',
    },
    tituloContainer: {
        marginBottom: 10,
    }
});

Pagamento.navigationOptions = {
    tabBarIcon: <Icon name="money" size={18} color="#999" />
}

export default Pagamento;