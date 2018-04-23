import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Content, Container } from 'native-base';
import FooterFab from '../FooterFab';
import * as authActions from '../../redux/actions/autheticationActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DiscoverTV from './DiscoverTV';
import DiscoverMovies from './DiscoveryMovies';

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
 }

class Main extends Component {
	renderDiscover = () => {
		let number = getRandomInt(100);

		if (number > 50) { 
			return <DiscoverTV/>;
		} else {
			return <DiscoverMovies/>
		}
	}

  render() {
	 return (
		 <Container>
			<Content style={styles.content}>
				{this.renderDiscover()}
			</Content>
			<FooterFab/>
		</Container>
	 )
  };
};

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#191B28",
	},
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