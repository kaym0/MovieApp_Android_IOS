import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Button, Card, CardItem, Title, Body } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as discoverActions from '../../../redux/actions/discoverActions';
import * as localActions from '../../../redux/actions/localActions';

class MovieDescription extends Component {
	constructor(props) {
		super(props);
		this.moreInfo = this.moreInfo.bind(this);
	}

	moreInfo = () => {
		this.props.navigation.navigate("MovieInfo");
		this.props.sidebar_default_colors();
	}

	render() {
		return (
			<View style={styles.container}>
				<View style = {styles.backgroundContainer}>
					<Image source={{uri: `https://image.tmdb.org/t/p/w300${this.props.movies[this.props.display_key].backdrop_path}` }} resizeMode = 'cover' style = {styles.backdrop} />
				</View>
				<View style = {styles.overlay}>
					<Card transparent padding style={styles.descriptionImageCard}>
						<Image style = {styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${this.props.movies[this.props.display_key].poster_path}` }}/>
					</Card>
					<Card transparent style={styles.descriptionTextCard}>
						<CardItem style={styles.descriptionHeaderContainer}>
							<Text numberOfLines={2} style={styles.descriptionHeaderText}>{this.props.movies[this.props.display_key].name}</Text>
						</CardItem>
						<CardItem cardBody style={styles.descriptionBodyContainer}>
							<Body style={styles.descriptionBody}>
								<Text style={styles.descriptionBodyText} numberOfLines={9}>{this.props.movies[this.props.display_key].overview}</Text>
							</Body>
						</CardItem>
						<CardItem button style={styles.descriptionFooterContainer}>
							<Button onPress={this.moreInfo} style={styles.descriptionButton} rounded>
								<Text style={styles.buttonText}>   Read More    </Text>
							</Button>
						</CardItem>
					</Card>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttonText: {
		color: "white"//"#DBDEDF"
	},
	descriptionButton: {
		backgroundColor: "#D72160"
	},
	descriptionBody: {
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderRadius: 20,
		padding: 10
	},
	descriptionFooterContainer: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: 'center'
	},
	descriptionBodyText: {
		color: "#DBDEDF",
		opacity: 2,
	},
	descriptionBodyContainer: {
		flex: 3, 
		padding: 10,
		backgroundColor: "transparent", 
		flexDirection: 'row',
	},
	descriptionHeaderText: {
		color: "#DBDEDF",
		fontFamily: "Kiona",
		fontSize: 20,
		textAlign: 'center',
		justifyContent: 'center'
	},
	descriptionHeaderContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		justifyContent: 'center',
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
    paddingTop: 50
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
     borderColor: 'black',
		flex: 1,
		opacity: 0.5,
	 },
});

MovieDescription.propTypes = {
	movies: PropTypes.object,
	display_key: PropTypes.number,
	update_movie_key: PropTypes.func,
	sidebar_default_colors: PropTypes.func
}

const mapStateToProps = (state) => ({
	movies: state.discover.movies,
	display_key: state.discover.movie_info_key
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		update_movie_key: (key) => dispatch(discoverActions.update_movie_key(key)),
		sidebar_default_colors: () => dispatch(localActions.sidebar_default_colors()),
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(MovieDescription);