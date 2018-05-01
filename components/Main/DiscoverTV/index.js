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
	}
	componentDidMount (){
		this.props.discoverTV();
	};

	updateDisplayInfo = (new_key) => {
		this.props.update_tv_key(new_key)
	}

	loadNextPage = async () => {
		this.props._refreshing(false);
		let page = this.props.page;
		page++;
		this.props.update_tv_discovery_page(page).then(() => {
			setTimeout(() => {
				this.props._refreshing(true);
			},4000);
			}
		)
	}

/**
 * 
 * @name Old, maybe use later.
 * 	leftPage = async () => {
		let page = this.props.page;
		page--;
		this.props.changeDiscoverPageTV(page)
		//this.scroll.props.scrollToEnd();
	}
	
	*/

	render () { 
		const TV = Object.values(this.props.tv).map((series,i) => (
			<TouchableHighlight style={styles.touchableHighlight} key={i} onPress={() => this.updateDisplayInfo(i)}>
				<Card style={styles.cardMain}>
					<CardItem style={styles.cardImageContainer} cardBody>
						<Image 
							source={{uri: `https://image.tmdb.org/t/p/w300${series.poster_path}`}} 
							style={{height:300 , flex: 1, }}
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
				<Container style={{flex: 0.1, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#1E202D'}}>
						<Text style={styles.listName}>Popular</Text>
				</Container>
				<Container style={{flex: 2, backgroundColor: "#191B28"}}>
						<InfiniteScrollView
							ref="_scrollView"
							onLoadMoreAsync={this.loadNextPage.bind(this)}
						  canLoadMore={this.props.refreshing}
							horizontal={true}
							style={styles.InfiniteScrollView}
						>
							{TV}

							{ this.props.refreshing===false
								? (<Card transparent style={{backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}><Spinner/></Card>)
								: (null)
							}
					</InfiniteScrollView>*/
				</Container>
			</Container>
		);
	}
} 

const styles = StyleSheet.create({
	/**
	 * @name RightArrow
	 */

	 InfiniteScrollView: {
		backgroundColor: "#191B28"
	 },
	/**
	 * @name MainCardDisplay
	 */

	touchableHighlight: {
		backgroundColor: "#191B28"
	},
	container: {
		flex: 2,
		alignItems: 'center',
		backgroundColor: "#191B28"
	 },
	 listName: {
		color: "#DBDEDF",
		justifyContent: 'center',
		textAlign: 'center',
		fontFamily: "Kiona",
		fontSize: 15,
		backgroundColor: "#191B28"
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
	display_key: PropTypes.number,
	update_tv_key: PropTypes.func,
	update_tv_discovery_page: PropTypes.func,
	_refreshing: PropTypes.func
 };

const mapStateToProps = (state) => ({
	page: state.discover.page,
	total_results: state.discover.total_results,
	total_pages: state.discover.total_pages,
	tv: state.discover.tv,
	display_key: state.discover.tv_info_key,
	refreshing: state.discover.refreshing
})

const mapDispatchToProps = (dispatch) =>  {
	return {
		discoverTV: () => dispatch(discoverActions.discoverTV()),
		update_tv_key: (new_key) => dispatch(discoverActions.update_tv_key(new_key)),
		update_tv_discovery_page: (page) => dispatch(discoverActions.update_tv_discovery_page(page)),
		_refreshing: (status) => dispatch(discoverActions._refreshing(status)),
	}
};


export default connect(mapStateToProps, mapDispatchToProps)(DiscoverTV)