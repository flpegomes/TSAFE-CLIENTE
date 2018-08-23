import Home from './Mapa.js';
import Perfil from './Perfil';
import Pagamento from './Pagamento';


import React, { Fragment } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import PrincipalConversas from './PrincipalConversas.js';


  





//const logo_url = 'https://i.imgur.com/Ak1i1Ze.png';
const logo_url ='https://i.imgur.com/Y63DKEA.png';

const App = () => (
  <Container>
    <View style={styles.container}>
    <Tabs tabBarPosition='bottom'>
      <Tab heading={<TabHeading style={styles.tabHeading} ><Icon style={styles.icon} type="FontAwesome" name="home" /></TabHeading>}>
        <Home />
      </Tab>
      <Tab heading={<TabHeading style={styles.tabHeading} ><Icon style={styles.icon} type="FontAwesome" name="user" /></TabHeading>}>
        <Perfil />
      </Tab>
      <Tab heading={<TabHeading style={styles.tabHeading} ><Icon style={styles.icon} type="FontAwesome" name="credit-card" /></TabHeading>}>
        <Pagamento />
      </Tab>
      <Tab heading={<TabHeading style={styles.tabHeading} ><Icon style={styles.icon} type="Octicons" name="credit-card" /></TabHeading>}>
        <PrincipalConversas />
      </Tab>
    </Tabs>
    </View>
  </Container>
);

export default App;

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