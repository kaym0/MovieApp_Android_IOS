import React, {Component} from 'react';
import { TouchableHighlight, View, StyleSheet, Text, Image, ImageBackground} from 'react-native';
import { Header,Container, Card, CardItem, Left, Body, Right, Title, Button, Icon, Content, Spinner}  from 'native-base';
import * as discoverActions from '../../../redux/actions/discoverActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MovieDescription from './description';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

class DiscoverMovies extends Component { 
	constructor(props) {
		super(props);
		//this.renderStars = this.renderStars.bind(this);
		this.updateDisplayInfo = this.updateDisplayInfo.bind(this)
	}


	componentDidMount() {
		this.props.discoverMovies();
	}
	/**
	 * @name Old render stars methiod, maybe use later
	 * @param average: average number 
	 * of stars which is then divided by 2 to make out of
	 *  5 stars instead of 10
	 
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
	}*/

	loadNextPage = async () => {
		this.props._refreshing(false);
		let page = this.props.page;
		page++;
		this.props.update_movie_discovery_page(page).then(() => {
			setTimeout(() => {
				this.props._refreshing(true);
			},4000);
			}
		)
	}

	updateDisplayInfo = (i) => {
		this.props.update_movie_key(i)
	}

	render () { 
		const Movies = Object.values(this.props.movies).map((movie,i) => (
				<TouchableHighlight key={i} onPress={() => this.updateDisplayInfo(i)}>
					<Card style={styles.cardMain}>
							<CardItem style={styles.cardImageContainer} cardBody>
								<Image 
									button
									source={{uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}`}} 
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
						{ (typeof this.props.movies[0]) !== "undefined"
						? <MovieDescription {...this.props} navigation={this.props.navigation}/> 
						: null 
						}
					</View>
					<Container style={{flex: 0.1	, justifyContent: 'flex-end', backgroundColor: '#1E202D'}}>
						<Text style={styles.listName}>Popular</Text>
					</Container>
					<Container style={{flex: 2}}>
						<InfiniteScrollView
								ref="_scrollView"
								onLoadMoreAsync={this.loadNextPage.bind(this)}
								canLoadMore={this.props.refreshing}
								horizontal={true}
								style={styles.InfiniteScrollView}
							>
								{Movies}
							{ this.props.refreshing===false
							? (<Card transparent style={{backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}><Spinner/></Card>)
							: (null)
							}
						</InfiniteScrollView>
					</Container>
				</Container>);
	}
}

const styles = StyleSheet.create({
	listName: {
		color: "#DBDEDF",
		justifyContent: 'center',
		textAlign: 'center',
		fontFamily: "Kiona",
		fontSize: 15
	},
	 container: {
		flex: 2,
    alignItems: 'center',
    borderColor: 'black'
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
	searchText: PropTypes.string,
	display_key: PropTypes.number,
	update_movie_key: PropTypes.func,
	update_movie_discovery_page: PropTypes.func,
	_refreshing: PropTypes.func
 };

 DiscoverMovies.getInitialProps = () => {

}

const mapStateToProps = (state) => ({
	page: state.discover.page,
	total_results: state.discover.total_results,
	total_pages: state.discover.total_pages,
	movies: state.discover.movies,
	display_key: state.discover.movie_info_key,
	refreshing: state.discover.refreshing
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		discoverMovies: () => dispatch(discoverActions.discoverMovies()),
		update_movie_key: (key) => dispatch(discoverActions.update_movie_key(key)),
		update_movie_discovery_page: (page) => dispatch(discoverActions.update_movie_discovery_page(page)),
		_refreshing: (status) => dispatch(discoverActions._refreshing(status)),
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(DiscoverMovies)