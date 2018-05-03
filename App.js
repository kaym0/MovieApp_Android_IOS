import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, AppState } from 'react-native';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { StackNavigation} from 'react-navigation';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';
import { store, persistor} from './redux/store/store.js';
import { connect } from 'react-redux';
//components
import AppWithNavigation from './router/AppNavigation';
import { AppNavigator } from './router/AppNavigation';
import AppRouter from './router/AppNavigation';

export class App extends Component {
	state = {
		appState: AppState.currentState
	}
	
	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
	}
	
	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}
	
	_handleAppStateChange = (nextAppState) => {
		if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
			console.log('App has come to the foreground!')
		}
		this.setState({appState: nextAppState});
	}
   render () {
		 if (this.state.appState === 'active') {

		 }
		 /*const RouterNav = props => (
			<AppWithNavigation
			navigation={addNavigationHelpers({
			 dispatch: props.dispatch,
			 state: props.nav,})}/>
		)*/
		 //const RouterWithState = connect(mapStateToProps)(AppWithNavigation)

      return (
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <StatusBar hidden/>
               <Root>
									<AppRouter/>
							 </Root>
            </PersistGate>
         </Provider>
      )
   }
}

const mapStateToProps = ({ nav }) => ({ nav })


export default App;
