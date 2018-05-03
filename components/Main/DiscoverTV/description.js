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
					<Image source={{uri: `https://image.tmdb.org/t/p/w300${this.props.tv[this.props.display_key].backdrop_path}` }} resizeMode = 'cover' style = {styles.backdrop} />
				</View>
				<View style = {styles.overlay}>
					<Card transparent padding style={styles.descriptionImageCard}>
						<Image style = {styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${this.props.tv[this.props.display_key].poster_path}` }}/>
					</Card>
					<Card transparent style={styles.descriptionTextCard}>
						<CardItem style={styles.descriptionHeaderContainer}>
							<Text numberOfLines={2} style={styles.descriptionHeaderText}>{this.props.tv[this.props.display_key].name}</Text>
						</CardItem>
						<CardItem cardBody style={styles.descriptionBodyContainer}>
							<Body style={styles.descriptionBody}>
								<Text style={styles.descriptionBodyText} numberOfLines={9}>{this.props.tv[this.props.display_key].overview}</Text>
							</Body>
						</CardItem>
						<CardItem button style={styles.descriptionFooterContainer}>
							<Button style={styles.descriptionButton} rounded>
								<Text style={styles.buttonText}>   Read More    </Text>
							</Button>
						</CardItem>
					</Card>

				</View>
			</View>
		);
	}
}

TVDescription.propTypes = {
	tv: PropTypes.object,
	display_key: PropTypes.number,
	update_tv_key: PropTypes.func
}

const styles = StyleSheet.create({
	buttonText: {
		color: "#2d3436"
	},
	descriptionButton: {
		backgroundColor: "#6EBFFC",//"#D72160"
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
	display_key: state.discover.tv_info_key
})

const mapDispatchToProps = (dispatch) => {
	return {
		update_tv_key: (key) => dispatch(discoverActions.update_tv_key(key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TVDescription);