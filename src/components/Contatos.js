import React, { Fragment, Component } from 'react';
import { Container, Header, Left, Right, Body, Title, Button, Icon, View, Fab, List, ListItem, Thumbnail, Text, Badge, Content, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { Image, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import AdicionarConversaModal from './AdicionarConversaModal';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { mostrarModal, esconderModal, contatosUsuarioFetch } from '../Actions/AppActions';


const messages = [
  { id: 1, name: 'Diego Fernandes', avatar_url: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4', last_message: 'Lorem ipsum', time: '18:20 PM' },
  { id: 2,name: 'Claudio Orlandi', avatar_url: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g', last_message: 'Lorem ipsum', time: '10:12 AM' },
  { id: 2,name: 'Felipe Gomes', avatar_url: 'https://scontent.fsdu17-1.fna.fbcdn.net/v/t1.0-9/35328319_1747624545331318_1003134133611790336_n.jpg?_nc_cat=0&_nc_eui2=AeHhXiNy-hetBDdi8L33WMw-0mxNp0y8tG6QKoH8oKiDvyKrGjKm3TbSlpQKrvLqF5cBlB34DAdSmm80UnMvmhvJFnHrXLa2-f6IMyKPscnlIA&oh=2733e5dc65292b22b2f9d7d573529f63&oe=5C057EE9', last_message: 'Lorem ipsum', time: '10:12 AM' },

];

class Contatos extends Component {


  componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados(nextProps.contatos);      
  }

  criaFonteDeDados(contatos) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.fonteDeDados = ds.cloneWithRows(contatos);
  }

  componentWillMount() {
    this.props.contatosUsuarioFetch();
    this.criaFonteDeDados(this.props.contatos);
  }

  _mostrarModal() {
    this.props.mostrarModal();
  }

  _esconderModal() {
    this.props.esconderModal();
  }


  render() {
    return (
        <Fragment>
          <ListView
            enableEmptySections
            dataSource={this.fonteDeDados}
            renderRow={data => ( 
                    <ListItem avatar onPress={ () => Actions.Chat({ title:`${data.nome}`, contatoNome: data.nome, contatoEmail: data.email}) }>
                        <Left>
                            <Thumbnail source={{ uri: 'https://growthfoundation.in/wp-content/uploads/2013/08/Facebook-no-profile-picture-icon-620x389.jpg'}} />
                        </Left>
                        <Body>
                            <Text>{data.nome}</Text>
                            <Text note>{data.email}</Text>
                        </Body>
                        {/* <Right>
                            <Text note>11:44</Text>
                        </Right>*/}
                    </ListItem>
            )}
          />

          <Fab
            direction="down"
            position="bottomRight"
            style={{ backgroundColor: "#fadf63"}}
            onPress={() => this._mostrarModal() }
            underlayColor='transparent'
          >
            <Icon type="FontAwesome" name="plus" />
          </Fab>
          <AdicionarConversaModal 
              onCancel={() => this._esconderModal()} 
              visible={this.props.modalVisible}  
              onRequestClose={() => {}}
        />
        </Fragment>

        
    );
  }
}


Contatos.navigationOptions = {
    tabBarIcon: <Icon name="message" size={18} color="#999" />
}


const mapStateToProps = state => (
  {
      modalVisible: state.AppReducer.modalVisible,
      contatos: _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid}
      })   
  }
)
export default connect(mapStateToProps, { mostrarModal, esconderModal, contatosUsuarioFetch })(Contatos);


