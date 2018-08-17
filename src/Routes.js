import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import Login from'./components/Login';
import Cadastro from'./components/Cadastro';

export default props => (
    <Router>
        <Stack key='root'>
            <Scene key='Login' component={Login} title="Login" />
            <Scene key='Cadastro' component={Cadastro} title="Cadastro" />
        </Stack>
    </Router>

);