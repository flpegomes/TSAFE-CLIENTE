import Home from './src/components/Home.js';
import Perfil from './src/components/Perfil';
import { Icon } from 'react-native';
import React from 'react';

import { createBottomTabNavigator } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
    Home: Home,
    Perfil: Perfil,
});


export default TabNavigator ;