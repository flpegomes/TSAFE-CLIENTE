import Home from './Home';
import Perfil from './Perfil';

import { createStackNavigator } from 'react-navigation';

const StackNavigator = createStackNavigator({
    Home: Home,
    Perfil: Perfil,
});


export default { StackNavigator };