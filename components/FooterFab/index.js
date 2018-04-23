import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fab, Icon, Button, Title } from 'native-base'
import * as fabActions from '../../redux/actions/fabActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
class FooterFab extends Component {
  render() {
	 return (
		<View>
			<Fab
				direction="up"
				position="bottomRight"
				style={styles.fab}
				onPress={() => this.props.ToggleFab()}
				active={this.props.fab}
			>
				<Icon name="ios-search"></Icon>
					<Button style={{backgroundColor:'#770F34', justifyContent: 'center', alignItems: 'center'}}>
						<MaterialIcons style={styles.icons} name="tv"/>
					</Button>
					<Button style={{backgroundColor: '#656893', justifyContent: 'center', alignItems: 'center'}}>
						<Icon style={styles.icons} name="ios-film" />
					</Button>
			</Fab>
		</View>
	 );
  }
}
FooterFab.propTypes = {
	ToggleFab: PropTypes.func,
	fab: PropTypes.bool

}
const styles = StyleSheet.create({
	fab : {
		backgroundColor: "#266B8D",
	},
	icons: {
		fontSize: 25,
		color: 'white'
	},
});

const mapStateToProps = (state) => ({
  fab: state.local.fab
})

const mapDispatchToProps = (dispatch) => {
	return {
		ToggleFab: () => dispatch(fabActions.ToggleFab()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterFab);
