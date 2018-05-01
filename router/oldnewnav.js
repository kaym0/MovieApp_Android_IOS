import AppWithNavigation from './AppNavigation';
import { AppNavigator } from './AppNavigation';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation'
import React, {Component} from 'react';

class AppNav extends Component {
	render() {
			const { navigationState, dispatch } = this.props;
			return(
					<AppNavigator 
							navigation={addNavigationHelpers({ dispatch, state: navigationState })} // passing our navigation prop (consisting of dispatch and state) to AppNavigator.
					/>
			)
	}
}


const mapStateToProps = (state) => {
	return ({
			navigationState: state.NavigationReducer // NavigationReducer contains the navigation state of the app
	})
}


export default connect(mapStateToProps)(AppNav)