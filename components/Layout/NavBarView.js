import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavBarView extends Component {
	 constructor(props) {
			super(props);
	 }

	 render() {
			return (
				 <View style={{backgroundColor: 'transparent'}}>
				 </View>
			);
	 }
}

NavBarView.propTypes = {

}

const styles = StyleSheet.create({

});

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
	 return {
			///example: () => dispatch(actionFile.actionName(),
	 }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarView);