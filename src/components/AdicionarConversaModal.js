import React, { Component } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity, } from 'react-native'
import { connect } from 'react-redux';
import { mostrarModal, esconderModal } from '../Actions/AutenticacaoActions';

class AdicionarConversaModal extends Component {
    state = {
        newRepoText: '',  
    };

    _esconderModal() {
        this.props.esconderModal();
    }

    render () {
        return (
            <Modal animationType="fade" transparent={true} visible={this.props.modalVisible} onRequestClose={() => {}}>
                <View style={styles.modalContainer}> 
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxTitle}> Adicionar conversa</Text>
                        <TextInput
                            autoFocus
                            autoCapitalize='none'
                            style={styles.boxInput}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder='nome'
                            value={this.state.newRepoText}
                            onChangeText={newRepoText => this.setState({ newRepoText })}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => this._esconderModal()}
                            >
                                <Text style={styles.buttonText}> Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={() => this.props.onAdd(this.state.newRepoText)}
                            >
                                <Text style={styles.buttonText}> Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    boxContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        width: 280,
    },
    boxTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    boxInput: {
        alignSelf: 'stretch',
        marginTop: 10,
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderWidth: 1, 
        borderColor: '#DDD',
        borderRadius: 3,
        height: 40,
    },
    buttonContainer: {
        marginTop: 10,
        height: 40, 
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,   
    },
    cancelButton: {
        backgroundColor: '#E25F5F',
        marginRight: 5,
    },
    submitButton: {
        backgroundColor: '#70BD85',
        marginLeft: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff', 
        fontSize: 12,
    }
})


const mapStateToProps = state => (
    {
        modalVisible: state.AutenticacaoReducer.modalVisible,
    }
  )
  
  export default connect(mapStateToProps, { mostrarModal, esconderModal })(AdicionarConversaModal);