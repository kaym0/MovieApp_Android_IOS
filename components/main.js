import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Content, Container } from 'native-base';
import FooterSearchBar from './footerSearchbar';
import * as authActions from '../redux/actions/autheticationActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Main extends Component {
	componentDidMount = async () => {
		try {
			await (this.props.requestToken())
			.then(this.props.requestSession(this.props.request_token));
		} catch(e) {
			console.log("Something went wrong!");
		}
	}
   render(){ 
		const navigation = this.props.navigation;
      return (
			<Container style={styles.container}>
				<Content>
					<Text style={{color: 'black'}}>This is the main page</Text>
				</Content>
	
					<FooterSearchBar navigation={navigation}/>
			</Container>
      );
   }
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
Main.propTypes = {
	requestToken: PropTypes.func,
	requestSession: PropTypes.func,
	request_token: PropTypes.string,
	session_id: PropTypes.string
}
const mapStateToProps = (state) => ({
   request_token: state.auth.request_token,
   session_id: state.auth.session_id
})

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(authActions.requestToken()),
  requestSession: () => dispatch(authActions.requestSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);