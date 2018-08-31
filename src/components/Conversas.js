import React, { Fragment, Component } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { Image, StyleSheet, ListView } from 'react-native';
import AdicionarConversaModal from './AdicionarConversaModal';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { conversasUsuarioFetch } from '../Actions/AppActions';


const messages = [
  { id: 1, name: 'Diego Fernandes', avatar_url: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4', last_message: 'Lorem ipsum', time: '18:20 PM' },
  { id: 2,name: 'Claudio Orlandi', avatar_url: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g', last_message: 'Lorem ipsum', time: '10:12 AM' },
  { id: 2,name: 'Felipe Gomes', avatar_url: 'https://scontent.fsdu17-1.fna.fbcdn.net/v/t1.0-9/35328319_1747624545331318_1003134133611790336_n.jpg?_nc_cat=0&_nc_eui2=AeHhXiNy-hetBDdi8L33WMw-0mxNp0y8tG6QKoH8oKiDvyKrGjKm3TbSlpQKrvLqF5cBlB34DAdSmm80UnMvmhvJFnHrXLa2-f6IMyKPscnlIA&oh=2733e5dc65292b22b2f9d7d573529f63&oe=5C057EE9', last_message: 'Lorem ipsum', time: '10:12 AM' },

];

class Conversas extends Component {

  componentWillMount() {
     this.props.conversasUsuarioFetch();
     this.criaFonteDeDados(this.props.conversas);
  }

  componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados(nextProps.conversas);
  }

  criaFonteDeDados(conversas) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = ds.cloneWithRows(conversas);
  }

  render() {
    return (
      
      <Fragment>
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={data => ( 
                <ListItem avatar onPress={ () => Actions.Chat({ title:`${data.nome}`, contatoNome: data.nome, contatoEmail: data.email}) }>
                    <Left>
                        <Thumbnail source={{ uri: 'https://scontent.fsdu17-1.fna.fbcdn.net/v/t1.0-9/35328319_1747624545331318_1003134133611790336_n.jpg?_nc_cat=0&_nc_eui2=AeHhXiNy-hetBDdi8L33WMw-0mxNp0y8tG6QKoH8oKiDvyKrGjKm3TbSlpQKrvLqF5cBlB34DAdSmm80UnMvmhvJFnHrXLa2-f6IMyKPscnlIA&oh=2733e5dc65292b22b2f9d7d573529f63&oe=5C057EE9'}} />
                    </Left>
                    <Body>
                        <Text>{data.nome}</Text>
                        <Text note>{data.email}</Text>
                    </Body>
                    <Right>
                        <Text note>11:44</Text>
                    </Right>
                </ListItem>
        )}
      />
        </Fragment>

        
    );
  }
}


Conversas.navigationOptions = {
    tabBarIcon: <Icon name="message" size={18} color="#999" />
}


const mapStateToProps = state => {
  const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
    return { ...val, uid }
  });
  return {
      conversas
  }
}
export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);


