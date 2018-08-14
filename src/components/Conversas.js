import React from 'react';
import { View, Button, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

const Conversas = ({ navigation }) => (
    <View style={styles.a}>
    <ScrollView>
        <View style={styles.containerChat}> 
            <Image 
                style={styles.chatImage}
                source={{uri:   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-s6mvhAqk5oMNjca6nxc4ICnCV_7mIsIIbkDOSFoIIXEK3BZ'}}
            />

            <View style={styles.chatInfo}>
                <Text style={styles.chatNome}> Berg </Text>
                <Text style={styles.ultimaMensagem}> Salve, meu consagrado </Text>
            </View>
        </View> 

        <View style={styles.containerChat}> 
            <Image 
                style={styles.chatImage}
                source={{uri:   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-s6mvhAqk5oMNjca6nxc4ICnCV_7mIsIIbkDOSFoIIXEK3BZ'}}
            />

            <View style={styles.chatInfo}>
                <Text style={styles.chatNome}> Berg </Text>
                <Text style={styles.ultimaMensagem}> Salve, meu consagrado </Text>
            </View>
        </View> 

        <View style={styles.containerChat}> 
            <Image 
                style={styles.chatImage}
                source={{uri:   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-s6mvhAqk5oMNjca6nxc4ICnCV_7mIsIIbkDOSFoIIXEK3BZ'}}
            />

            <View style={styles.chatInfo}>
                <Text style={styles.chatNome}> Berg </Text>
                <Text style={styles.ultimaMensagem}> Salve, meu consagrado </Text>
            </View>
        </View> 

        <View style={styles.containerChat}> 
            <Image 
                style={styles.chatImage}
                source={{uri:   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-s6mvhAqk5oMNjca6nxc4ICnCV_7mIsIIbkDOSFoIIXEK3BZ'}}
            />

            <View style={styles.chatInfo}>
                <Text style={styles.chatNome}> Berg </Text>
                <Text style={styles.ultimaMensagem}> Salve, meu consagrado </Text>
            </View>
        </View> 

        <View style={styles.containerChat}> 
            <Image 
                style={styles.chatImage}
                source={{uri:   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-s6mvhAqk5oMNjca6nxc4ICnCV_7mIsIIbkDOSFoIIXEK3BZ'}}
            />

            <View style={styles.chatInfo}>
                <Text style={styles.chatNome}> Berg </Text>
                <Text style={styles.ultimaMensagem}> Salve, meu consagrado </Text>
            </View>
        </View> 

        <View style={styles.containerChat}> 
            <Image 
                style={styles.chatImage}
                source={{uri:   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-s6mvhAqk5oMNjca6nxc4ICnCV_7mIsIIbkDOSFoIIXEK3BZ'}}
            />

            <View style={styles.chatInfo}>
                <Text style={styles.chatNome}> Berg </Text>
                <Text style={styles.ultimaMensagem}> Salve, meu consagrado </Text>
            </View>
        </View> 
        </ScrollView>
    </View>


);


const styles = StyleSheet.create({
    a: {
        backgroundColor:'#333',
        flex: 1,
        padding: 20,
    },
    containerChat: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
      },
      chatImage: {
          width: 50,
          height: 50,
          borderRadius: 25,
      },
      chatInfo: {
          marginLeft: 10,
      },
      chatNome: {
          fontWeight: 'bold',
          color: '#333',
      },
      ultimaMensagem: {
          fontSize: 14,
          color: '#999',
      }
})

Conversas.navigationOptions = {
    tabBarIcon: <Icon name="message" size={18} color="#999" />
}

export default Conversas;