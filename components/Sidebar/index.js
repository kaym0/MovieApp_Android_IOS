import React from 'react';
import { View, Text, StyleSheet, AppRegistry, Image } from 'react-native';
import { Button, Container, Content, List, ListItem, Drawer } from 'native-base'
import { connect } from 'react-redux';
import * as localActions from '../../redux/actions/localActions';
import * as userActions from '../../redux/actions/userActions';
import SidebarButtons from './SidebarButtons'
import {Actions} from 'react-native-router-flux';
let routes = ["Login", "Main", "Settings"];

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount = () => {
	if (typeof this.props.user !== "undefined") {
			if (this.props.user != null && this.props.user.length > -1) {
				routes = ["Logout", "Main", "Settings"];
			}
		}
	}


	render() {
		return (
		<Container style={styles.content}>
				<View padding style={{ paddingTop: 50, marginLeft: -20, backgroundColor: "#191B28" ,justifyContent: 'center', alignItems: 'center'}}>
					<Image
						style={{backgroundColor: "blue", height:100,width:100, borderRadius: 50}}
						source={{ uri: "https://www.gravatar.com/avatar/e3d0dfc783dff6bc032ebf670e634f04.png?s=300"}}
					/>
				</View>
					<List
					transparent
					style={{flex: 1, backgroundColor: "#191B28"}}
					dataArray={routes}
					renderRow={data => 
					{
					{ return Actions.currentScene === data
					?	(<ListItem itemDivider style={{backgroundColor: "#1E202D"}}>
							<Button transparent style={{flex: 1, height: "100%", width: "100%"}} onPress={ () => { Actions[data].call(); Actions.refresh()}} >
									<Text style={styles.listText}>{data}</Text>
							</Button>
						</ListItem> )
					: (
						<ListItem itemDivider style={{backgroundColor: "#191B28"}}>
							<Button transparent style={{flex: 1, height: "100%", width: "100%"}} onPress={ () => { Actions[data].call(); Actions.refresh()}}>
									<Text style={styles.listText}>{data}</Text>
							</Button>
						</ListItem>
					)
						}
					}}
					/>
				<List style={{backgroundColor: "#191B28"}}>
					<ListItem
					itemDivider
						style={{alignItems: 'center', justifyContent: 'center', backgroundColor: this.props.login_color}}
						button 
					>
					{ this.props.username !== null
						?(<Button onPress={() => Actions.Logout()} transparent style={{flex: 1, height: "100%", width: "100%", justifyContent: 'center'}}>
							<Text style={styles.listText}>Logout?</Text>
						 </Button>)
						:(<Button transparent onPress={() => Actions.Login()}  style={{flex: 1, height: "100%", width: "100%", justifyContent: 'center'}}>
								<Text style={styles.listText}>Login</Text>
							</Button>)
					  }
					</ListItem>
				</List>
		</Container>
	 )
	}
}



/*

	<ListItem itemDivider style={{backgroundColor: this.props.main_color}}>
							<Button transparent style={{flex: 1, height: "100%", width: "100%"}} onPress={() => {Actions.Main();}} >
									<Text style={styles.listText}>Main</Text>
							</Button>
						</ListItem>
						<ListItem itemDivider style={{backgroundColor: this.props.settings_color}}>
							<Button transparent style={{flex: 1, height: "100%", width: "100%"}} onPress={() => {Actions.Settings(); this.props.sidebar_default_colors(); this.props.settings_active() }} >
								<Text style={styles.listText}>Settings</Text>
							</Button>
						</ListItem>
					</List>
	*/
/*
	<ListItem itemDivider style={{backgroundColor: this.main_color}}>
								<Button transparent style={{flex: 1, height: "100%", width: "100%"}} onPress={() => {this.props.navigation.navigate("Main"); this.changeColorDefault(); this.main_color = "#1E202D" }} >
										<Text style={styles.listText}>Main</Text>
								</Button>
							</ListItem>
							<ListItem itemDivider style={{backgroundColor: this.settings_color}}>
								<Button transparent style={{flex: 1, height: "100%", width: "100%"}} onPress={() => {this.props.navigation.navigate("Settings"); this.changeColorDefault(); this.settings_color = "#1E202D"}} >
									<Text style={styles.listText}>Settings</Text>
								</Button>
							</ListItem>
*/

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#191B28",
		flexDirection: 'column'
	},
	listText: {
		color: "#DBDEDF",
		textAlign: 'center', 
		fontFamily: 'Kiona', 
		fontSize: 20,
	},

});

const mapStateToProps = (state) => ({
	avatar: state.user.avatar || null,
	id: state.user.id || null,
	language: state.user.language || null,
	region: state.user.region || null,
	name: state.user.name || null,
	username: state.user.username || null,
	sidebar: state.local.sidebar,
	main_color: state.local.main_color,
	settings_color: state.local.settings_color,
	login_color: state.local.login_color
})

const mapDispatchToProps = (dispatch) => {
	 return {
		updateSidebar: () => dispatch(localActions.updateSidebar()),
		sidebar_default_colors: () => dispatch(localActions.sidebar_default_colors()),
		main_active: () =>  dispatch(localActions.main_active()),
		settings_active: () => dispatch(localActions.settings_active()),
		login_active: () =>  dispatch(localActions.login_active()),
	 }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
