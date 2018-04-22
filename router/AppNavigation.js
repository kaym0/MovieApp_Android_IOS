import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Layout from '../components/layout.js';
import Main from '../components/main';
import PageTwo from '../components/page2';
import Sidebar from '../components/sidebar';
import SearchMovie from '../components/SearchMovie';
/**
 * @todo
 * import { Transitioner } from 'react-navigation';
 * import { Animated, Easing } from 'react-native';
 * */

 /**
  * @todo transitionerconfig
  * const transitionConfig = () => {}
  */


const DrawerStack = DrawerNavigator({
   Main: { screen: Main },
}, {
   contentComponent: props => <Sidebar {...props}/>
})

export const AppNavigator = StackNavigator({
   Main: { screen: DrawerStack },
   SearchMovie: { screen: SearchMovie }
}, { 
	navigationOptions: { 
		header: ({navigation}) => (
			<Layout navigation={navigation} />
		)
	},
})

class AppWithNavigation extends Component {
   render() {
      return (
         <AppNavigator/>
      )
   }
}


export default AppWithNavigation;