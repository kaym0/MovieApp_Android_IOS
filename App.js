import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Content, Container } from 'native-base';
import { Provider } from 'react-redux';
import { StackNavigation} from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import { store, persistor} from './redux/store/store.js';
import { connect } from 'react-redux';
//components
import AppWithNavigation from './router/AppNavigation';

export class App extends Component {
   render () {
      return (
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <StatusBar hidden/>
               <AppWithNavigation/>
            </PersistGate>
         </Provider>
      )
   }
}

export default App;