import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, StyleSheet, Image } from 'react-native';
import { Container, Card, CardItem, Left, Body, Right, Title, Button, Icon, Content}  from 'native-base';
import * as searchActions from '../redux/actions/searchActions'
//Object.values
export class MovieSearch extends Component {
  render() {
	const Movies = Object.values(this.props.movies).map((movie,i) => (
		<Card key={i}>
			<CardItem>
				<Body>
					<Text style={styles.text}>{movie.title}</Text>
				</Body>
				<Right/>
			</CardItem>
			<CardItem style={{height:300}} cardBody>
				<Image 
					source={{uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}`}} 
					style={{height:300 , flex: 1}}
					resizeMode="contain"
				/>
			</CardItem>
			<CardItem>
				<Left>
					<Button transparent>
						<Icon name="ios-star"/>
						<Text>Avereage score:{movie.vote_average}</Text>
					</Button>
				</Left>
				<Body>
					<Icon name="thumbs-up"/>
					<Text>{movie.vote_count} votes.</Text>
				</Body>
			</CardItem>
		</Card>
	));
	 return (
		 <Container>
			<Content padder>
				{Movies}
			</Content>
		</Container>
	 )
  };
};

const styles = StyleSheet.create({
	text: {
		color: "white",
	}
})

MovieSearch.propTypes = {
	page: PropTypes.number,
	total_results: PropTypes.number,
	total_pages: PropTypes.number,
	movies: PropTypes.object,
	searchText: PropTypes.string
 };

const mapStateToProps = (state) => ({
	page: state.search.page,
	total_results: state.search.total_results,
	total_pages: state.search.total_pages,
	movies: state.search.results
})

const mapDispatchToProps = (dispatch) => ({
 // searchText: (text) => dispatch(searchActions.updateSearchText(text)), 
});

export default connect(mapStateToProps)(MovieSearch)

