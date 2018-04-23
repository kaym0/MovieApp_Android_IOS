import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, StyleSheet, Image, View } from 'react-native';
import { Container, Card, CardItem, Left, Body, Right, Title, Button, Icon, Content}  from 'native-base';
import * as searchActions from '../../redux/actions/searchActions';

export default class SearchTV extends Component {
		constructor(props) {
			super(props);
			this.renderStars = this.renderStars.bind(this);
		}
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
	  render() {
		const Movies = Object.values(this.props.movies).map((movie,i) => (
			<Card style={styles.cardMain} key={i}>
				<CardItem style={styles.cardHeaderContainer} transparent>
					<Text style={styles.cardHeaderText}>{movie.title}</Text>
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
						<Icon style={styles.voteIcon} name="thumbs-up"/>
						<Text style={styles.cardFooterText}>{movie.vote_count} votes.</Text>
					</Body>
				</CardItem>
			</Card>
		));
		 return (
			 <Container>
				<Content style={styles.content}>
					{Movies}
				</Content>
			</Container>
		 )
	  };
	};
	
	const styles = StyleSheet.create({
		content: {
			backgroundColor: "#191B28",
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
	})

const mapStateToProps = (state) => ({
	page: state.search.page,
	total_results: state.search.total_results,
	total_pages: state.search.total_pages,
	movies: state.search.tv
})

const mapStateToProps = (state) => ({
})


const mapDispatchToProps = (dispatch) => {
  return {

  }
};



export default connect(mapStateToProps, mapDispatchToProps)(SearchTV)
