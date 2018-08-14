import Home from './src/components/Home.js';
import Perfil from './src/components/Perfil';
import Pagamento from './src/components/Pagamento';
import Conversas from './src/components/Conversas';



import { createBottomTabNavigator } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
    Home: Home,
    Perfil: Perfil,
    Pagamento: Pagamento,
    Conversas: Conversas,
});


export default TabNavigator ;