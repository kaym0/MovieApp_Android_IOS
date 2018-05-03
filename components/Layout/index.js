import React, { Component  } from 'react';
import { Content, Container, Header, Left, Right, Body, Text, Icon, Button, Title } from 'native-base';
import { StyleSheet, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class Layout extends Component {
	constructor(props) {
		super(props);
		this.openDrawer = this.openDrawer.bind(this);
	}

	openDrawer = () => {
		Actions.drawerOpen();
	}
	
   render () {
      return (
         <View style={{borderColor: 'black'}}>
            <StatusBar hidden/>
            <Header iosBarStyle="dark-content" style={styles.header}>
            <Left style={{alignContent: 'center', justifyContent: 'center'}}>
								 { Actions.currentScene === "Main"
                  ? (
											<Button onPress={() => this.openDrawer()} transparent>
                     		<Icon style={styles.headerIcon} name="menu"></Icon>
											</Button>
										)
									: (
											<Button onPress={() => Actions.pop()} transparent>
												<Icon style={styles.headerIcon} name="ios-arrow-back"></Icon>
											</Button>
										)
								 }
               </Left>
               <Body>
                  <Title style={styles.headerTitle}>
                     Movie
                  </Title>
               </Body>
               <Right/>
            </Header>
         </View>
      )
   }
}


const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   header: {
      backgroundColor: "#1E202D",
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 0,
   },
   headerTitle: {
      color: "#65656D",
      justifyContent: 'center',
   },
   headerIcon: {
      color: "#FFFFFE",
      fontSize: 35
   }
})

Layout.propTypes = {
	children: PropTypes.node,
	requestToken: PropTypes.func,
	requestSession: PropTypes.func,
	request_token: PropTypes.string,
	session_id: PropTypes.string,
	page: PropTypes.number
}

const mapStateToProps = (state) => ({
   request_token: state.auth.request_token,
   session_id: state.auth.session_id,
	 page: state.discover.page,
	 go_back: state.local.go_back_state
})

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(authActions.requestToken()),
  requestSession: () => dispatch(authActions.requestSession()),
});


export default connect(mapStateToProps,mapDispatchToProps)(Layout);