import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Content, Container, Button, Icon, Toast } from 'native-base'
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import * as authActions from '../../redux/actions/autheticationActions'
const Form =  t.form.Form;
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.color = "#DBDEDF"
stylesheet.controlLabel.normal.color = '#DBDEDF';
stylesheet.controlLabel.normal.fontFamily = "Kiona"
import { USER_LOGGED_IN } from '../../redux/actions/types';
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


class Login extends Component {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	componentDidMount() {
		this.refs.form.getComponent('username').refs.input.focus();
	}

	onPress = async (dispatch) => {
		const navigation = this.props.navigation
		var value = this.refs.form.getValue();
		const API_KEY = "3e310aa84d4c1640df231f11e3ab3ea8";
		if (value) {
			if (value != null) {
				value = {username: value.username, password: value.password, }
				try {
						this.props.loginUser(value)
						.then(() => {
							if (this.props.login_success === true) {
								Toast.show({
									text: "Success! Logging you in..",
									buttonText: "Okay",
									type: "success"
								})
								this.clearForm();
								//this.props.loginComplete(response);
								setTimeout(() => {
									navigation.goBack();
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
						/*let res1 = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`);
						let response1 = await res1.json()
						.then( async (resp1) => { 
							let firstRequestToken = resp1.request_token;
							let res2 = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}&username=${value.username}&password=${value.password}&request_token=${firstRequestToken}`)
							let response2 = await res2.json()
							.then( async(resp2)=>{
								let secondRequestToken = resp2.request_token;
								let res3 = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}&request_token=${secondRequestToken}`)
								let response3 = await res3.json()
								.then((response3) => {
									console.log(response3);
									console.log(response3.success);
									if (response3.success == true) {
										Toast.show({
										text: "Success! Logging you in..",
										buttonText: "Okay",
										type: "success"
										})
										this.clearForm();
										this.props.loginComplete(response3);
										setTimeout(() => {
											navigation.goBack();
										}, 1000)
									} else {
										this.clearForm();
									Toast.show({
										text: "Username or password was incorrect.",
										buttonText: "Okay",
										type: "danger"
									})
									}
								}).catch((error) => {
									console.error(error);
									this.clearForm();
									Toast.show({
										text: "Sorry, there was an error logging in!",
										buttonText: "Okay",
										type: "danger"
									})
								})
							}).catch((error) => {
								console.error(error);
								this.clearForm();
								Toast.show({
									text: "Sorry, there was an error logging in!",
									buttonText: "Okay",
									type: "danger"
								})
							})
						}).catch((error) => {
							console.error(error);
							this.clearForm();
							Toast.show({
								text: "Sorry, there was an error logging in!",
								buttonText: "Okay",
								type: "danger"
							})
						})*/
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

}

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
	login_success: state.local.login_success
})

const mapDispatchToProps = (dispatch) => {
	return {
		loginComplete: (response) => dispatch(authActions.loginComplete(response)),
		loginUser: (login_values) => dispatch(authActions.loginUser(login_values))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);