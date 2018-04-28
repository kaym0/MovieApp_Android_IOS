import React from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';
import { Button, Container, Content, List, ListItem } from 'native-base'
import { connect } from 'react-redux';
let routes = ["Login", "Main", "Settings"];

class SideBar extends React.Component {

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
				<List
				style={{paddingLeft: -50, }}
					dataArray={routes}
					renderRow={data => {
					return (
						<ListItem
							button
							style={{justifyContent: 'center', }}
							>
							<Button transparent style={{flex: 1, height: "100%", width: "100%", justifyContent: 'center'}} onPress={() => this.props.navigation.navigate(data)} ><Text style={styles.listText}>{data}</Text></Button>
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

const mapStateToProps = (state) => ({
 	user: state.auth.user || null
})

const mapDispatchToProps = (dispatch) => {
	 return {
			checkUser: () => dispatch(authActions.checkUser())
	 }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
