import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import Login from'./components/Login';
import Principal from'./components/Principal';
import Cadastro from'./components/Cadastro';
import Chat from './components/Chat'
import Contatos from './components/Contatos'

export default props => (
    <Router>
        <Stack key='root'>
            <Scene key='Login' component={Login} hideNavBar={true} />
            <Scene key='Cadastro' component={Cadastro} title="Cadastro" />
            <Scene key='Principal' component={Principal} title="Principal" hideNavBar={true} />
            <Scene key='Chat' component={Chat} title="Chat" hideNavBar={false} />
            <Scene key='Contatos' component={Contatos} title="Contatos" hideNavBar={false} />
        </Stack>
    </Router>

);