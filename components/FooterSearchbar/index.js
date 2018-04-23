import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Item, Input, Icon, Button, Footer, FooterTab, Header } from 'native-base';
import * as searchActions from '../../redux/actions/searchActions'
import PropTypes from 'prop-types';

class FooterSearchbar extends Component {
	constructor(props) {
		super(props);
		this.makeSearch = this.makeSearch.bind(this);
		this.updateText = this.updateText.bind(this);
		this._search = this._search.bind(this);
	}
	makeSearch = () => {
		this.props.searchMovie(this.props.searchText);
		this.props.updateSearchText("");
		this.clearForm();
		this.props.navigation.navigate({
			routeName: "MovieSearch"
		})
	}
	_search = () => {
		this.props.searchMovie(this.props.searchText);
		this.clearForm();
		this.props.navigation.navigate({
			routeName: "SearchMovie"
		});
	}
	clearForm = () => {
		this.props.updateSearchText("");
		this.props.searchText = null;
	}
	updateText = (text) => {
		this.props.updateSearchText(text);
	}

	/*
	<Input 
						value={this.props.searchText} 
						onChange={(text) => this.props.updateSearchText}
						placeholder="search" 
					>
					<Icon style={{justifyContent: 'flex-end'}} name="ios-film"/>
					</Input>
				</Item>
				*/
  render() {
	 return (
			<Footer style={styles.footer}>
				<Item style={{flex: 1, borderColor: 'transparent', justifyContent: 'center', alignItems: 'center'}} underlined={false}>
					<Input 
						style={styles.searchinput}
						value={this.props.searchText} 
						onChangeText={(text) => this.props.updateSearchText(text)}
						placeholder="search" 
					/>
				</Item>
				<Item verticle style={{alignItems: 'center', justifyContent: 'center',borderColor: 'transparent'}}>
					<Button transparent verticle onPress={this._search}> 						
						<Icon style={styles.icon} name="ios-search"/>
					</Button>
				</Item>
			</Footer>
	 );
  }
}

const styles = StyleSheet.create({
	footer: {
		backgroundColor: '#1E202D',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
	icon: {
		color: "#266B8D"
	},
	searchinput: {
		flexDirection: 'column',
		padding: 0,
		margin: 0,
		borderWidth: 0,
		fontSize: 10,
		backgroundColor: '#F1F0EF',
		height: 30,
		borderRadius: 100
	}
});

FooterSearchbar.propTypes = {
	searchText: PropTypes.string
}

const mapStateToProps = (state) => ({
  searchText: state.search.searchText,
})

const mapDispatchToProps = (dispatch) => {
	return {
		updateSearchText: (text) => dispatch(searchActions.updateSearchText(text)),
		searchMovie: (movie) => dispatch(searchActions.searchMovie(movie))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(FooterSearchbar)
