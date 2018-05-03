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
    this.props.fetch_movie_info(this.props.movies[this.props.display_key].id);
    this.props.fetch_movie_recommendations(this.props.movies[this.props.display_key].id);
    this.props.fetch_movie_credits(this.props.movies[this.props.display_key].id);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style = {styles.backgroundContainer}>
					<Image source={{uri: `https://image.tmdb.org/t/p/w500${this.props.movies[this.props.display_key].backdrop_path}` }} resizeMode = 'cover' style = {styles.backdrop} />
				</View>
				<View style = {styles.overlay}>
					<Card transparent padding style={styles.descriptionImageCard}>
						<CardItem style={{backgroundColor: "transparent", height: '100%', width: '100%'}}>
              <Image style = {styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${this.props.movies[this.props.display_key].poster_path}` }}/>
            </CardItem>
					</Card>
					<Card transparent style={styles.descriptionTextCard}>
						<CardItem style={styles.cardItem_top_text}>
              <Text adjustsFontSizeToFit={true} numberOfLines={2} style={styles.text_title}>
                {this.props.movies[this.props.display_key].title}
              </Text>
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
  text_title: {
    alignSelf: 'flex-start', 
    justifyContent: 'flex-start',
    fontFamily: 'Kiona', 
    color: '#DBDEDF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cardItem_top_text: {
    backgroundColor: 'transparent', 
    flex: 1.5,
    alignItems: 'flex-start',
  },
	buttonText: {
		color: "#2d3436"//"#DBDEDF"
	},
	descriptionButton: {
		backgroundColor: "#6EBFFC",//"#D72160"
	},
	descriptionBody: {
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderRadius: 20,
    padding: 10,
    flex: 4
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
		flex: 4, 
		padding: 10,
		backgroundColor: "transparent", 
		flexDirection: 'row',
	},
	descriptionTextCard: {
		flex: 1, 
		backgroundColor: "transparent", 
		borderColor: "transparent",
	},
	descriptionImageCard: {
		flex: 1, 
		backgroundColor: "transparent", 
    borderColor: "transparent", 
    alignItems: 'flex-start'
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
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent'
	 },
	 poster: { 
		width: "100%",
		height: "100%",
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
  sidebar_default_colors: PropTypes.func,
  fetch_movie_info: PropTypes.func
}

const mapStateToProps = (state) => ({
	movies: state.discover.movies,
	display_key: state.discover.movie_info_key
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		update_movie_key: (key) => dispatch(discoverActions.update_movie_key(key)),
    sidebar_default_colors: () => dispatch(localActions.sidebar_default_colors()),
    fetch_movie_info: (movie_id) => dispatch(discoverActions.fetch_movie_info(movie_id)),
    fetch_movie_recommendations: (movie_id) => dispatch(discoverActions.fetch_movie_recommendations(movie_id)),
    fetch_movie_credits: (movie_id) => dispatch(discoverActions.fetch_movie_credits(movie_id)),
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(MovieDescription);