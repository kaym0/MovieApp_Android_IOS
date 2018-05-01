import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Content, Container, Card, CardItem, List, ListItem } from 'native-base';
import * as localActions from '../../../redux/actions/localActions';

class MovieInfo extends Component {
	 constructor(props) {
			super(props);
	 }

	 render() {
		 console.log(this.props.navigation)
		 this.props.sendToLayout(this.props.navigation.state.key)
			return (
				 <View>
					 <Text> textInComponent </Text>
				 </View>
			);
	 }
}

MovieInfo.propTypes = {

}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
	 return {
		sendToLayout: (goBack) => dispatch(localActions.sendToLayout(goBack)),
	 }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);