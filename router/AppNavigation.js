import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import {Router, Modal, Scene, Drawer, Stack, ActionConst} from 'react-native-router-flux';
import Main from '../components/Main';
import Settings from '../components/Settings';
import MovieInfo from '../components/Information/Movies'
import TVInfo from '../components/Information/TV';
import Sidebar from '../components/Sidebar'
import Login from '../components/Login';
import Layout from '../components/Layout/index.js'
import NavBarView from '../components/Layout/NavBarView';
import MenuIcon from  '../images/kaymo.jpeg';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const AppRouter = () => {
	return (
		<Router>
			<Modal>
				<Stack hideNavBar key="root"> 
				<Drawer key="Drawer" hideNavBar contentComponent={Sidebar} drawerImage={MenuIcon} drawerWidth={deviceWidth/1.38} drawerHeight={deviceHeight}>
							<Stack navBar={Layout} key="MainStack">
								<Scene key="Main" initial={true} component={Main}/>
								<Scene key="Settings" component={Settings}/>
								<Scene key="MovieInfo" component={MovieInfo}/>
								<Scene key="TVInfo" component={TVInfo}/>
								<Scene key="Login" component={Login}/>
							</Stack>
						</Drawer>
				</Stack>	
			</Modal>
		</Router>
	)
}
/*
<Scene hideNavBar panHandlers={null}>
							<Stack navBar={Layout} key="MainStack">
								<Scene key="Main" initial={true} component={Main}/>
								<Scene key="Settings" component={Settings}/>
								<Scene key="MovieInfo" component={MovieInfo}/>
								<Scene key="TVInfo" component={TVInfo}/>
								<Scene key="Login" component={Login}/>
							</Stack>
						</Scene>
						/*

			/*	<Stack key="Navbar" titleStyle={{alignSelf: 'center'}}>
						<Scene
							key="Layout"
							title="CustomNavBar"
							navBar={Layout}
							component={NavBarView}
							back
						/>
					</Stack>*/

export default AppRouter;