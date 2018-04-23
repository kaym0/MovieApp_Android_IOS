import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { Container, Card, CardItem, Left, Body, Right, Title, Button, Icon, Content}  from 'native-base';
import * as landingPage from '../../../redux/actions/landingPage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DiscoverTV extends Component { 
	constructor(props) {
		super(props);
	
	}
	componentDidMount (){
		this.props.discoverTV();
	};
	/// renders stars
	renderStars = (average) => {
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

	render () { 
		const TV = Object.values(this.props.tv).map((series,i) => (
		<Card style={styles.cardMain} key={i}>
			<CardItem style={styles.cardHeaderContainer} transparent>
				<Text style={styles.cardHeaderText}>{series.title}</Text>
			</CardItem>
			<CardItem style={styles.cardImageContainer} cardBody>
				<Image 
					source={{uri: `https://image.tmdb.org/t/p/w300${series.poster_path}`}} 
					style={{height:300 , flex: 1}}
					resizeMode="contain"
				/>
			</CardItem>
			<CardItem style={styles.cardFooterContainer}>
				<Left style={styles.starIconContainer}>
					<View style={{flexDirection: "row"}}>
						{this.renderStars(series.vote_average)}
					</View>
					<View style={{flexDirection: "row"}}>
						<Text style={styles.cardFooterText}>Avereage score: {series.vote_average}</Text>
					</View>
				</Left>
				<Body style={styles.voteIconContainer}>
				<Icon active style={styles.voteIcon} name="thumbs-up"/>
					<Text style={styles.cardFooterText}>{series.vote_count} votes.</Text>
				</Body>
			</CardItem>
		</Card>
		));
		return (<View>{TV}</View>)
	}
}

const styles = StyleSheet.create({
	cardMain:{
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		backgroundColor: "#1E202D",
		borderColor: "#323440"
	},
	cardImageContainer: {
		height:300, 
		backgroundColor: "#1E202D", 
	},
	cardHeaderContainer: {
		backgroundColor: "#1E202D",
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderColor: "#323440",
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardFooterContainer: {
		backgroundColor: "#1E202D",
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderColor: "#323440",
	},
	cardHeaderText: {
		color: "#DBDEDF",
		fontSize: 25,
		fontFamily: 'Kiona'
	},
	voteIcon: {
		color: "#266B8D",
	},
	voteIconContainer:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center', 
		flexDirection: 'column'
	},
	staricon: {
		color: "#266B8D",
	},
	starIconContainer: {
		flexDirection: "column",
		flex: 1, 
	},
	cardFooterText: {
		color: "#DBDEDF"
	}
});


DiscoverTV.propTypes = {
	page: PropTypes.number,
	total_results: PropTypes.number,
	total_pages: PropTypes.number,
	tv: PropTypes.object,
	searchText: PropTypes.string
 };

const mapStateToProps = (state) => ({
	page: state.discover.page,
	total_results: state.discover.total_results,
	total_pages: state.discover.total_pages,
	tv: state.discover.tv
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		discoverTV: () => dispatch(landingPage.discoverTV())
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(DiscoverTV)