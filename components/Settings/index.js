import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { connect } from 'react-redux';
import { Content, Title, Body, Right, Left, List, ListItem, Picker, Icon} from 'native-base';
import PropTypes from 'prop-types';
import * as settingActions from '../../redux/actions/settingsActions';

class Settings extends Component {
	constructor(props) {
		super(props);

	}

	updateDiscover = (newOption) => {
		this.props.optionsDiscover(newOption);
	}

	render() {
		return (
			<Content style={styles.content}>
				<List>
					<ListItem>
							<Left>
								<Text style={styles.listText}> Main Page Discovery </Text>
							</Left>
							<Right>
									<Picker
									mode="dropdown"
									iosIcon={<Icon name="ios-arrow-down-outline"/>}
									placeholder="Discovery Options"
									placeholderStyle={{ color: "#bfc6ea" }}
									textStyle={{ color: "#DBDEDF"}}
									placeholderIconColor="#266B8D"
									style={{width: undefined}}
									selectedValue={this.props.discover}
									onValueChange={this.updateDiscover.bind(this)}
									>
										<Picker.Item label="Movies" value="Movies"/>
										<Picker.Item label="TV" value="TV"/>
									</Picker>
								</Right>
					</ListItem>
				</List>
			</Content>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#191B28"
	},
	listText: {
		color: "#DBDEDF",
		fontSize: 18
	}
});

Settings.propTypes = {
	discover: PropTypes.string,
	optionsDiscover: PropTypes.func
}

const mapStateToProps = (state) => ({
	discover: state.settings.discover
})

const mapDispatchToProps = (dispatch) => {
	return {
		optionsDiscover: (newOption) => dispatch(settingActions.optionsDiscover(newOption)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);