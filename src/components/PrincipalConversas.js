
import Conversas from './Conversas';
import Contatos from './Contatos';


import React, { Fragment } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { Image, StyleSheet } from 'react-native';





//const logo_url = 'https://i.imgur.com/Ak1i1Ze.png';
const logo_url ='https://i.imgur.com/Y63DKEA.png';

const PrincipalConversas = () => (
  <Container>
    <View style={styles.container}>
    <Tabs tabBarPosition='top'>
      <Tab heading={<TabHeading style={styles.tabHeading} ><Icon style={styles.icon} type="FontAwesome" name="address-book-o" /></TabHeading>}>
        <Contatos />
      </Tab>
      <Tab heading={<TabHeading style={styles.tabHeading} ><Icon style={styles.icon} type="FontAwesome" name="comments" /></TabHeading>}>
        <Conversas />
      </Tab>
    </Tabs>
    </View>
  </Container>
);

export default PrincipalConversas;

const styles = StyleSheet.create({
  tabHeading: {
    backgroundColor: "#222",
  },
  header: { 
    backgroundColor: "#222",
  },
  container: {
    flex: 1,
  }, 
  icon: {
      color:'#fadf63'
  },
  body: {
      paddingLeft: 50,
  }
});