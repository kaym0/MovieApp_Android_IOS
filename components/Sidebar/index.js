import React from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base'
const routes = ["Main", "Settings"]

export default class SideBar extends React.Component {
	render() {
		return (
			<Container style={styles.content}>
				<List
				style={{paddingLeft: -50}}
					dataArray={routes}
					renderRow={data => {
					return (
						<ListItem
							button
							style={{justifyContent: 'center'}}
							onPress={() => this.props.navigation.navigate(data)}>
							<Text style={styles.listText}>{data}</Text>
						</ListItem>
					);
					}}
				/>
			</Container>
		);
	}
}


const styles = StyleSheet.create({
	content: {
		backgroundColor: "#191B28"
	},
	listText: {
		color: "#DBDEDF",
		textAlign: 'center', 
		fontFamily: 'Kiona', 
		fontSize: 20
	}
});