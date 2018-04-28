import React, { Component  } from 'react';
import { Content, Container, Header, Left, Right, Body, Text, Icon, Button, Title } from 'native-base';
import { StyleSheet, View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Layout extends Component {
	constructor(props) {
		super(props);
		this.openDrawer = this.openDrawer.bind(this);
	}

	openDrawer = () => {
		const navigation = this.props.navigation;
		navigation.navigate('DrawerToggle');
	}
	
   render () {
      return (
         <View>
            <StatusBar hidden/>
            <Header rounded noShadow="false" style={styles.header}>
               <Left>
                  <Button onPress={() => this.openDrawer()} transparent>
                     <Icon style={styles.headerIcon} name="menu"></Icon>
                  </Button>
               </Left>
               <Body>
                  <Title style={styles.headerTitle}>
                     Movie
                  </Title>
               </Body>
               <Right>
               </Right>
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
		marginTop: 0,
      backgroundColor: "#1E202D",
      alignItems: 'center',
      justifyContent: 'center',
		borderBottomColor: "#847979",
		borderColor: "#847979",
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
	 page: state.discover.page
})

const mapDispatchToProps = (dispatch) => ({
  requestToken: () => dispatch(authActions.requestToken()),
  requestSession: () => dispatch(authActions.requestSession()),
});


export default connect(mapStateToProps,mapDispatchToProps)(Layout);