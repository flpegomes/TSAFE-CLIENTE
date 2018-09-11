import React, { Component } from 'react';
import Routes from './src/Routes';
import Principal from './src/components/Principal';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

class App extends Component {
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyBQWP7JTyJpq3uM5kq_msco2kb-RbJ3igU",
      authDomain: "tsafe-f0c90.firebaseapp.com",
      databaseURL: "https://tsafe-f0c90.firebaseio.com",
      projectId: "tsafe-f0c90",
      storageBucket: "tsafe-f0c90.appspot.com",
      messagingSenderId: "791072086116"
    };
    firebase.initializeApp(config);
  }

  render() {
    return(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}> 
        <Routes />
      </Provider>
    );
  }
}

export default App;
