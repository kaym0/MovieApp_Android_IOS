import React, {Component} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { Container, Card, CardItem, Left, Body, Right, Title, Button, Icon, Content}  from 'native-base';
import * as landingPage from '../../../redux/actions/landingPage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DiscoverMovies extends Component { 
	constructor(props) {
		super(props);
		this.renderStars = this.renderStars.bind(this);
	}


	componentDidMount() {
		this.props.discoverMovies();
	}
	/// renders stars
	renderStars(average) {
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
		const Movies = Object.values(this.props.movies).map((movie,i) => (
		<Card style={styles.cardMain} key={i}>
			<CardItem style={styles.cardHeaderContainer} transparent>
				
			</CardItem>
			<CardItem style={styles.cardImageContainer} cardBody>
				<Image 
					source={{uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}`}} 
					style={{height:300 , flex: 1}}
					resizeMode="contain"
				/>
			</CardItem>
			<CardItem style={styles.cardFooterContainer}>
				<Left style={styles.starIconContainer}>
					<View style={{flexDirection: "row"}}>
						{this.renderStars(movie.vote_average)}
					</View>
					<View style={{flexDirection: "row"}}>
						<Text style={styles.cardFooterText}>Avereage score: {movie.vote_average}</Text>
					</View>
				</Left>
				<Body style={styles.voteIconContainer}>
					<Button transparent><Icon style={styles.voteIcon} name="thumbs-up"/></Button>
					<Text style={styles.cardFooterText}>{movie.vote_count} votes.</Text>
				</Body>
			</CardItem>
		</Card>
	));
	return (<Container style={{flex: 1.6}}><Content horizontal={true}>{Movies}</Content></Container>);
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
		flexWrap: 'wrap',
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


DiscoverMovies.propTypes = {
	page: PropTypes.number,
	total_results: PropTypes.number,
	total_pages: PropTypes.number,
	movie: PropTypes.object,
	searchText: PropTypes.string
 };

 DiscoverMovies.getInitialProps = () => {

}

const mapStateToProps = (state) => ({
	page: state.discover.page,
	total_results: state.discover.total_results,
	total_pages: state.discover.total_pages,
	movies: state.discover.movies
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		discoverMovies: () => dispatch(landingPage.discoverMovies())
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovies)