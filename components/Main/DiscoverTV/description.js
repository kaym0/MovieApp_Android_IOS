import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Button, Card, CardItem, Title, Body } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as discoverActions from '../../../redux/actions/discoverActions'
class TVDescription extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style = {styles.backgroundContainer}>
					<Image source={{uri: `https://image.tmdb.org/t/p/w300${this.props.tv[this.props.displayKey].backdrop_path}` }} resizeMode = 'cover' style = {styles.backdrop} />
				</View>
				<View style = {styles.overlay}>
					<Card padding style={styles.descriptionImageCard}>
						<Image style = {styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${this.props.tv[this.props.displayKey].poster_path}` }}/>
					</Card>
					<Card style={styles.descriptionTextCard}>
						<CardItem header style={styles.descriptionHeaderContainer}>
							<Title numberOfLines={3} style={styles.descriptionHeaderText}>{this.props.tv[this.props.displayKey].name}</Title>
						</CardItem>
						<CardItem cardBody style={styles.descriptionBodyContainer}>
							<Body style={styles.descriptionBody}>
								<Text style={styles.descriptionBodyText} numberOfLines={8}>{this.props.tv[this.props.displayKey].overview}</Text>
							</Body>
						</CardItem>
						<CardItem button style={styles.descriptionFooterContainer}>
							<Button style={styles.descriptionButton} rounded>
								<Text>   Read More    </Text>
							</Button>
						</CardItem>
					</Card>
				</View>
			</View>
		);
	}
}

TVDescription.propTypes = {

}

const styles = StyleSheet.create({
	descriptionButton: {
		backgroundColor: "#D91A5F"
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
		flexWrap: 'wrap',
		fontFamily: "Kiona",
		fontSize: 20
	},
	descriptionHeaderContainer: {
		flex: 0.5,
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
	tv: state.discover.tv,
	displayKey: state.discover.tvInfoKey
})

const mapDispatchToProps = (dispatch) => {
	return {
		update_TV_Key: (key) => dispatch(discoverActions.update_TV_Key(key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TVDescription);