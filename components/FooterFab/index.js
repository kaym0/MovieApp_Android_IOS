import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fab, Icon, Button, Title } from 'native-base'
import * as localActions from '../../redux/actions/localActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class FooterFab extends Component {
  render() {
	 return (
		<Fab
		active={this.props.fab}
		direction="up"
		containerStyle={{ flex: 1 }}
		style={styles.fab}
		position="bottomRight"
		onPress={() => this.props.ToggleFab()}
		>
		<Icon name="ios-search" style={{color: "#2d3436"}} />
		<Button style={{ backgroundColor: '#770F34' }}>
			<MaterialIcons style={styles.icons} name="tv" />
		</Button>
		<Button style={{ backgroundColor: '#656893' }}>
			<Icon name="ios-film" />
		</Button>
		</Fab>
	 );
  }
}
FooterFab.propTypes = {
	ToggleFab: PropTypes.func,
	fab: PropTypes.bool

}
const styles = StyleSheet.create({
	fab : {
    backgroundColor: "#6EBFFC",//"#D72160",//"#ED4D4D",//"#266B8D",
	},
	icons: {
		fontSize: 20,
		color: 'white'
	},
});

const mapStateToProps = (state) => ({
  fab: state.local.fab
})

const mapDispatchToProps = (dispatch) => {
	return {
		ToggleFab: () => dispatch(localActions.ToggleFab()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterFab);
