import {ListItem, Button} from 'native-base';
import React, { Component } from 'react';
import {View, StyleSheet, Text } from 'react-native';

class SidebarButtons extends Component {
	constructor(props){
		super(props);
	}

	Button(data, itemkey) {
		console.log(this.props.activeItemKey)
		if ( this.props.data  === this.props.activeItemKey) {
			return (	
				<ListItem itemDivider
					style={{backgroundColor: "#1E202D", borderColor: "transparent", justifyContent: 'flex-start'}}
				>
					<Button transparent style={{height: "100%", width: "100%"}} onPress={() => {this.props.navigation.navigate(this.props.data); Sidebar.forceUpdate()}} >
						<Text style={styles.listText}>{this.props.data}</Text>
					</Button>
				</ListItem>)
		} else {
			return  (
				<ListItem
					itemDivider
					style={{backgroundColor: "#191B28", borderColor: "transparent", justifyContent: 'flex-start'}}
					>
					<Button transparent style={{flex: 1, height: "100%", width: "100%"}} onPress={() => {this.props.navigation.navigate(this.props.data); this.forceUpdate()}} >
						<Text style={styles.listText}>{this.props.data}</Text>
					</Button>
				</ListItem>
			)
		}
	}
	render() {
		return (
			<View>{this.Button(this.data, this.activeItemKey)}</View>
		)
	}
}


const styles = StyleSheet.create({
	listText: {
		color: 'white',
		fontFamily: "Kiona"
	}
});
export default SidebarButtons