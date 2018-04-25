import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardItem, Title, Body } from 'native-base';
import * as discoverActions from '../../../redux/actions/discoverActions';
import PropTypes from 'prop-types'
class MovieDescription extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style = {styles.backgroundContainer}>
					<Image source={{uri: `https://image.tmdb.org/t/p/w300${this.props.movies[this.props.displayKey].backdrop_path}` }} resizeMode = 'cover' style = {styles.backdrop} />
				</View>
				<View style = {styles.overlay}>
					<Card padding style={styles.descriptionImageCard}>
						<Image style = {styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${this.props.movies[this.props.displayKey].poster_path}` }}/>
					</Card>
					<Card style={styles.descriptionTextCard}>
						<CardItem header style={styles.descriptionHeaderContainer}>
							<Title numberOfLines={3} style={styles.descriptionHeaderText}>{this.props.movies[this.props.displayKey].title}</Title>
						</CardItem>
						<CardItem cardBody style={styles.descriptionBodyContainer}>
							<Body>
								<Text style={styles.descriptionBodyText} numberOfLines={8}>{this.props.movies[this.props.displayKey].overview}</Text>
							</Body>
						</CardItem>
						<CardItem style={styles.descriptionFooterContainer}/>
					</Card>
				</View>
			</View>
		);
	}
}

MovieDescription.propTypes = {
	displayMovie: PropTypes.func,
	movies: PropTypes.object,
}

const styles = StyleSheet.create({
	descriptionFooterContainer: {
		flex: 1,
		backgroundColor: "transparent"
	},
	descriptionBodyText: {
		color: "#DBDEDF"
	},
	descriptionBodyContainer: {
		flex: 2, 
		padding: 10,
		backgroundColor: "transparent", 
		flexDirection: 'row',
	},
	descriptionHeaderText: {
		color: "#DBDEDF",
		flexWrap: 'wrap',
		fontFamily: "Kiona",
		fontSize: 20
	},
	descriptionHeaderContainer: {
		flex: 1,
		alignItems: 'flex-start',
		flexWrap: "wrap",
		backgroundColor: "transparent",
		justifyContent: "center",
	},
	descriptionTextCard: {
		flex: 3, 
		backgroundColor: "transparent", 
		borderColor: "transparent",
	},
	descriptionImageCard: {
		flex: 2, 
		backgroundColor: "transparent", 
		borderColor: "transparent", 
	
	},
	backgroundContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	 },
	 container: {
		flex: 2,
		alignItems: 'center',
	 },
	 overlay: {
		opacity: 1,
		flexDirection: 'row',
		flex: 1,
	 },
	 poster: { 
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "contain",
		justifyContent: 'center',
	 },
	 backdrop: {
		flex: 1,
		opacity: 0.5,
	 },
});

const mapStateToProps = (state) => ({
	movies: state.discover.movies,
	displayKey: state.discover.movieInfoKey
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		update_Movie_Key: (key) => dispatch(discoverActions.update_Movie_key(key))
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(MovieDescription);