import React, { Fragment } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { Image, StyleSheet } from 'react-native';

//import Icon from 'react-native-vector-icons/Entypo'


const Conversas = ({ messages }) => (
    <Fragment>
      <List>
        {messages.map( message => (
          <ListItem avatar key={message.id}>
            <Left>
              <Thumbnail source={{ uri: message.avatar_url}} />
            </Left>
            <Body>
              <Text>{message.name}</Text>
              <Text note>{message.last_message}</Text>
            </Body>
            <Right>
              <Text note>{message.time}</Text>
            </Right>
          </ListItem>
        ))}
      </List>
      <Fab
        direction="up"
        position="bottomRight"
        style={{ backgroundColor: "#fadf63"}}
      >
        <Icon type="FontAwesome" name="plus" />
      </Fab>
    </Fragment>
  );


Conversas.navigationOptions = {
    tabBarIcon: <Icon name="message" size={18} color="#999" />
}

export default Conversas;