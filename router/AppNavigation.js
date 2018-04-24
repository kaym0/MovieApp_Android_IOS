import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Layout from '../components/Layout';
import Main from '../components/Main';
import PageTwo from '../components/Page2';
import Sidebar from '../components/Sidebar';
import SearchMovie from '../components/SearchMovie';
import Settings from '../components/Settings'
/**
 * @todo
 * import { Transitioner } from 'react-navigation';
 * import { Animated, Easing } from 'react-native';
 * */

 /**
  * @todo transitionerconfig
  * const transitionConfig = () => {}
  */


 const DrawerStack =  DrawerNavigator({
	Main: {screen: Main},
	Settings: {screen: Settings}
},
{
	contentComponent: props => <Sidebar {...props}/>
}
)

export const AppNavigator = StackNavigator({
	Main: { screen: DrawerStack },
	SearchMovie: { screen: SearchMovie },
}, 
{ 
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