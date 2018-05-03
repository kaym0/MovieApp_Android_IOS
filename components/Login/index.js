import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container, Button, Icon, Toast } from 'native-base'
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import * as authActions from '../../redux/actions/autheticationActions'
import * as userActions from '../../redux/actions/userActions'
import { USER_LOGGED_IN } from '../../redux/actions/types';
import { Actions } from 'react-native-router-flux';
/**
 * @name tcomb setup
 */
const Form =  t.form.Form;
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.color = "#DBDEDF"
stylesheet.controlLabel.normal.color = '#DBDEDF';
stylesheet.controlLabel.normal.fontFamily = "Kiona";

const LoginForm = t.struct({
	username: t.String,
	password: t.String
})

const options = {
	fields: {
		username: {
			stylesheet: stylesheet,
			label: "Username",
			error: 'Field cannot be empty!',
			attr: {
				autoFocus: true
			}
		},
		password: {
			password: true,
			secureTextEntry: true,
			label: "Password",
			error: 'Field cannot be empty!',
			stylesheet: stylesheet,
		}
	}
}
/** 
 * @name Login Component
**/
class Login extends Component {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	componentDidMount() {
		this.refs.form.getComponent('username').refs.input.focus();
	}


	onPress = async (dispatch) => {
		var value = this.refs.form.getValue();
		const API_KEY = "3e310aa84d4c1640df231f11e3ab3ea8";
		if (value) {
			if (value != null) {
				value = {username: value.username, password: value.password, }
				try {
						this.props.loginUser(value)
						.then(() => {
							if (this.props.login_status === true) {
								Toast.show({
									text: "Success! Logging you in..",
									buttonText: "Okay",
									type: "success"
								})
								this.clearForm();
								this.props.fetch_user_data(this.props.session_id);
								setTimeout(() => {
									Actions.pop();
								}, 1000)
							} else {
								this.clearForm();
								Toast.show({
									text: "Sorry, there was an error logging in!",
									buttonText: "Okay",
									type: "danger"
								})
							}
						}
					)
				} catch (error) {
						this.clearForm();
						Toast.show({
							text: "Sorry, there was an error logging in!",
							buttonText: "Okay",
							type: "danger"
						})
				}
			}
		}
	}

	onChange = (value) => {
	  this.props.value = value;
	}

	clearForm = () => {
		this.props.value = null;
	}

	 render() {
			return (
				<Content>
					<Container style={styles.container}>
						<Form 
							ref="form"
							onChange={this.onChange.bind(this)}
							value={this.props.value}
							type={LoginForm} style={styles.form} 
							options={options}
						/>
						<Button transparent block rounded style={styles.button} onPress={this.onPress}>
							<Text style={styles.buttonText}>Login</Text>
						</Button>
					</Container>
				</Content>
			);
	 }
}

Login.propTypes = {
	value: PropTypes.string,
	login_status: PropTypes.bool.isRequired
}

/**
 * @name styles
 */
const styles = StyleSheet.create({
	container:{
		backgroundColor: "#191B28",
		flex: 1,
		padding: 40
	},
	loginstyle: {
		color: "#DBDEDF"
	},
	form:{
	},
	button:{
		backgroundColor: "#6EBFFC",
	},
	buttonText:{
		color: "#252F39",
		fontWeight: 'bold'
	},
});

const mapStateToProps = (state) => ({
	value: state.local.value,
	login_status: state.auth.login_status,
	session_id: state.auth.session_id
})

const mapDispatchToProps = (dispatch) => {
	return {
		loginComplete: (response) => dispatch(authActions.loginComplete(response)),
		loginUser: (login_values) => dispatch(authActions.loginUser(login_values)),
		fetch_user_data: (session_id) => dispatch(userActions.fetch_user_data(session_id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);