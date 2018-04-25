import React, {Component} from 'react';
import { TouchableHighlight, View, StyleSheet, Text, Image } from 'react-native';
import { Container, Card, CardItem, Left, Body, Right, Title, Button, Icon, Content }  from 'native-base';
import * as discoverActions from '../../../redux/actions/discoverActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TVDescription from './description'

class DiscoverTV extends Component { 
	constructor(props) {
		super(props);
	this.updateDisplayInfo = this.updateDisplayInfo.bind(this);
	}
	componentDidMount (){
		this.props.discoverTV();
	};
	/// renders stars
/*	renderStars = (average) => {
		let stars = average/2;
		const a = [];
		let key = 1;
		while (stars > 0.99) {
			a.push(<Icon key={key} style={styles.staricon} name="ios-star"/>)
			stars-=1;
			key++;
		}
		while (stars < 0.99 && stars > 0.4999) {
			a.push(<Icon key={key} style={styles.staricon} name="ios-star-half"/>)
			stars-=1;
			key++;
		}
		while (a.length>0) {
			return a;
			a.pop();
		}
	}
*/

	updateDisplayInfo = (new_key) => {
		this.props.update_TV_Key(new_key)
	}

	render () { 
		const TV = Object.values(this.props.tv).map((series,i) => (
		<TouchableHighlight key={i} onPress={() => this.updateDisplayInfo(i)}>
			<Card style={styles.cardMain}>
				<CardItem style={styles.cardImageContainer} cardBody>
					<Image 
						source={{uri: `https://image.tmdb.org/t/p/w300${series.poster_path}`}} 
						style={{height:300 , flex: 1}}
						resizeMode="contain"
					/>
				</CardItem>
			</Card>
		</TouchableHighlight>
		));
		return (
			<Container>
				<View style={styles.container}>
					{ (typeof this.props.tv[0]) !== "undefined"
					? <TVDescription {...this.props}/> 
					: null 
					}
				</View>
				<Container style={{flex: 0.1	, justifyContent: 'flex-end', backgroundColor: '#1E202D'}}>
					<Text style={styles.listName}>Popular</Text>
				</Container>
				<Container style={{flex: 2}}>
					<Content horizontal={true}>
						{TV}
					</Content>
				</Container>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 2,
		alignItems: 'center',
	 },
	 listName: {
		color: "#DBDEDF",
		justifyContent: 'center',
		textAlign: 'center',
		fontFamily: "Kiona",
		fontSize: 15
	},
	cardMain:{
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		backgroundColor: "#1E202D",
		borderColor: "#323440"
	},
	cardImageContainer: {
		height: 350,
		width: 200,
		flex: 1,
		backgroundColor: "#1E202D", 
	},
});


DiscoverTV.propTypes = {
	page: PropTypes.number,
	total_results: PropTypes.number,
	total_pages: PropTypes.number,
	tv: PropTypes.object,
	searchText: PropTypes.string,
	displayKey: PropTypes.number,
	getTVKey: PropTypes.func
 };

const mapStateToProps = (state) => ({
	page: state.discover.page,
	total_results: state.discover.total_results,
	total_pages: state.discover.total_pages,
	tv: state.discover.tv,
	displayKey: state.discover.tvInfoKey
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		discoverTV: () => dispatch(discoverActions.discoverTV()),
		update_TV_Key: (new_key) => dispatch(discoverActions.update_TV_Key(new_key)),
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(DiscoverTV)