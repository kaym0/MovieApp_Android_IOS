import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Content, Container, Fab, Icon, Button } from 'native-base';
import FooterFab from '../FooterFab';
import * as authActions from '../../redux/actions/autheticationActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DiscoverTV from './DiscoverTV';
import DiscoverMovies from './DiscoveryMovies';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as fabActions from '../../redux/actions/fabActions';

//Random number generators
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
 }

class Main extends Component {
	constructor(props) {
		super(props);
	}

	renderDiscover = () => {
		if (this.props.discoverSettings === "Movies") {
			return <DiscoverMovies/>
		} 

		if (this.props.discoverSettings === "TV") { 
			return <DiscoverTV/>
		}
	}

  render() {
	 return (
		 <Container style={{backgroundColor: "#191B28"}}>
				{this.renderDiscover()}
				<FooterFab/>
		</Container>
	 )
  };
};

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#191B28",
		flexDirection: 'row',
	},
	container: {
		flex: 1
	}
});
Main.propTypes = {
	requestToken: PropTypes.func,
	requestSession: PropTypes.func,
	request_token: PropTypes.string,
	session_id: PropTypes.string,
	ToggleFab: PropTypes.func,
	fab: PropTypes.bool,
}
const mapStateToProps = (state) => ({
   request_token: state.auth.request_token,
	session_id: state.auth.session_id,
	fab: state.local.fab,
	discoverSettings: state.settings.discover
})

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(authActions.requestToken()),
  requestSession: () => dispatch(authActions.requestSession()),
  ToggleFab: () => dispatch(fabActions.ToggleFab()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);