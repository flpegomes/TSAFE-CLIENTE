import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { View, InputGroup, Input, Icon } from 'native-base';

export const SearchBox = (getInputLocalizacao) => {

    _inputLocalizacao = (key, val) => {
        getInputLocalizacao({key, val});

    }

    return (
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}> Origem </Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#FF5E3A" />
                    <Input style={styles.inputSearch} 
                        placeholder="A onde você irá chegar?"
                        onChangeText={getInputLocalizacao.bind(this, "origem")} /> 
                </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}> Destino </Text>
                <InputGroup>
                    <Icon name="search" size={15} color="#FF5E3A" />
                    <Input style={styles.inputSearch} 
                        placeholder="Para onde quer ir?"
                        onChangeText={getInputLocalizacao.bind(this, "destino")} /> 

                    /> 
                </InputGroup>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    }
});

export default SearchBox;