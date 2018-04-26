import React, {Component} from 'react';
import { TouchableHighlight, View, StyleSheet, Text, Image, RefreshControl, ScrollView, FlatList } from 'react-native';
import { Container, Card, CardItem, Left, Body, Right, Title, Button, Icon, Content, Spinner }  from 'native-base';
import * as discoverActions from '../../../redux/actions/discoverActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TVDescription from './description'
import Entypo from 'react-native-vector-icons/Entypo'
import InfiniteScrollView from 'react-native-infinite-scroll-view';


class DiscoverTV extends Component { 
	constructor(props) {
		super(props);
		this.updateDisplayInfo = this.updateDisplayInfo.bind(this);
		this.leftPage = this.leftPage.bind(this);
		this._renderRefreshControl = this._renderRefreshControl.bind(this);
	}
	componentDidMount (){
		this.props.discoverTV();
	};

	updateDisplayInfo = (new_key) => {
		this.props.update_TV_Key(new_key)
	}

	loadNextPage = async () => {
		this.props._refreshing(false);
		let page = this.props.page;
		page++;
		this.props.changeDiscoverPageTV(page).then(() => {
			setTimeout(() => {
				this.props._refreshing(true);
			},4000);
			}
		)
	}

	leftPage = async () => {
		let page = this.props.page;
		page--;
		this.props.changeDiscoverPageTV(page)
		//this.scroll.props.scrollToEnd();
	}
	_renderRefreshControl() {
		// Reload all data 
		return (
			<RefreshControl
			 refreshing={false}
			 onRefresh={this.loadNextPage.bind(this)}
		  />
		);
	 }

	 _keyExtractor = (item, index) => item.id;

	 _renderItem = ({item}) => (
		<TouchableHighlight onPress={() => this.updateDisplayInfo()}>
		<Card style={styles.cardMain}>
			<CardItem style={styles.cardImageContainer} cardBody>
				<Image 
					source={{uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`}} 
					style={{height:300 , flex: 1}}
					resizeMode="contain"
				/>
			</CardItem>
		</Card>
	</TouchableHighlight>
  );

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
				<Container style={{flex: 0.2, flexDirection: 'row', backgroundColor: '#1E202D'}}>
					<View style={{flex:0.5, alignContent: 'flex-end'}}>
						<Text style={styles.listName}>Popular</Text>
					</View>	
				</Container>
				<Container style={{flex: 2}}>
						<InfiniteScrollView
							ref="_scrollView"
							onLoadMoreAsync={this.loadNextPage.bind(this)}
						  canLoadMore={this.props.refreshing}
							horizontal={true}
						>
						{TV}
						{ this.props.refreshing===false
						? (<Card style={{backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}><Spinner/></Card>)
						: (null)
						}
					</InfiniteScrollView>
				</Container>
			</Container>
		);
	}
}

/*

refreshControl={
							<RefreshControl
							refreshing={this.props.refreshing}
							 onRefresh={this.loadNextPage.bind(this)}
							/>
						}
		{ this.props.page < this.props.total_pages
			? (
				<Card style={styles.rightArrowCard}>
					<CardItem style={styles.rightArrowFiller} header/>
					<CardItem cardBody style={styles.rightArrowContainer}>
						<Body style={styles.rightArrowBody}>
							<Button onPress={this.rightPage} style={styles.rightArrowButton}>
								<Icon style={styles.rightArrowIcon} type="Entypo" name="chevron-thin-right"/>	
							</Button>
						</Body>
					</CardItem>
						<CardItem style={styles.rightArrowFiller}/>
				</Card>
	)
		: null 
	}
	{ 
		TV
		? TV
		: null	
	}*/
					/*
								{ TV
						? TV
						: null
					}
					
					{ this.props.page < this.props.total_pages
							? (
									<Card style={styles.rightArrowCard}>
										<CardItem style={styles.rightArrowFiller} header/>
										<CardItem cardBody style={styles.rightArrowContainer}>
											<Body style={styles.rightArrowBody}>
												<Button onPress={this.rightPage} style={styles.rightArrowButton}>
													<Icon style={styles.rightArrowIcon} type="Entypo" name="chevron-thin-right"/>	
												</Button>
											</Body>
										</CardItem>
										<CardItem style={styles.rightArrowFiller}/>
									</Card>
								)
							: null 
						}*/
const styles = StyleSheet.create({
	/**
	 * @name RightArrow
	 */
	rightArrowButton:{
		height: "100%", 
		width: "75%",
		backgroundColor: "#11131F",
		alignItems: "center",
		justifyContent: 'center'
	},
	rightArrowIcon: {
		alignContent: 'center', 
		flex: 1, 
		fontSize: 75, 
		color: "#DBDEDF",
		borderColor: "#323440"
	},
	rightArrowBody: {
		backgroundColor: "rgba(0,0,0,0.1)", 
		justifyContent: 'center', 
		alignItems: 'center',
		borderColor: "#323440"
	},
	rightArrowFiller:{
		flex: 1,
		backgroundColor: "#1E202D",
		borderColor: "#323440"
	},
	rightArrowCard: {
		flex: 1, 
		flexDirection: 'column',
		backgroundColor:"#1E202D",
		borderColor: "#323440"
	},
	rightArrowContainer:{
		flex: 2.5, 
		height: 350, 
		backgroundColor: "#1E202D",
		borderColor: "#323440",
		justifyContent: 'center'
	},
	/**
	 * @name MainCardDisplay
	 */
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
	getTVKey: PropTypes.func,
	changeDiscoverPageTV: PropTypes.func,
	_refreshing: PropTypes.func
 };

const mapStateToProps = (state) => ({
	page: state.discover.page,
	total_results: state.discover.total_results,
	total_pages: state.discover.total_pages,
	tv: state.discover.tv,
	displayKey: state.discover.tvInfoKey,
	refreshing: state.discover.refreshing
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		discoverTV: () => dispatch(discoverActions.discoverTV()),
		update_TV_Key: (new_key) => dispatch(discoverActions.update_TV_Key(new_key)),
		changeDiscoverPageTV: (page) => dispatch(discoverActions.changeDiscoverPageTV(page)),
		_refreshing: (status) => dispatch(discoverActions._refreshing(status)),
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(DiscoverTV)