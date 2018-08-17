import Home from './components/Mapa.js';
import Perfil from './components/Perfil';
import Pagamento from './components/Pagamento';
import Conversas from './components/Conversas';


import React, { Fragment } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { Image, StyleSheet } from 'react-native';

const messages = [
    { id: 1, name: 'Diego Fernandes', avatar_url: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4', last_message: 'Lorem ipsum', time: '18:20 PM' },
    { id: 2,name: 'Claudio Orlandi', avatar_url: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g', last_message: 'Lorem ipsum', time: '10:12 AM' },
    { id: 2,name: 'Felipe Gomes', avatar_url: 'https://scontent.fsdu17-1.fna.fbcdn.net/v/t1.0-9/35328319_1747624545331318_1003134133611790336_n.jpg?_nc_cat=0&_nc_eui2=AeHhXiNy-hetBDdi8L33WMw-0mxNp0y8tG6QKoH8oKiDvyKrGjKm3TbSlpQKrvLqF5cBlB34DAdSmm80UnMvmhvJFnHrXLa2-f6IMyKPscnlIA&oh=2733e5dc65292b22b2f9d7d573529f63&oe=5C057EE9', last_message: 'Lorem ipsum', time: '10:12 AM' },

];
  





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
        <Conversas messages={messages}/>
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