import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Fab, Footer, Icon, Button } from 'native-base';
import * as localActions from '../../redux/actions/localActions';
class MovieInfoFooter extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
        <Fab
        active={this.props.fab}
        direction="up"
        containerStyle={{ flex: 1 }}
        style={styles.fab}
        position="bottomRight"
        onPress={() => this.props.ToggleFab()}
        >
          <Icon type="SimpleLineIcons" name="options-vertical" style={{fontSize: 25, color: '#2d3436'}} />
          <Button transparent style={{ backgroundColor: '#11131F' }}>
            <Icon type="Ionicons" name="ios-heart" style={{color: '#d63031', fontSize: 30}}/>
          </Button>
          <Button transparent style={{ backgroundColor: '#11131F' }}>
            <Icon type="MaterialCommunityIcons" name="star-circle" style={{color: '#fdcb6e', fontSize: 30}} />
          </Button>
        </Fab>
      );
   }
}

MovieInfoFooter.propTypes = {

}

const styles = StyleSheet.create({
  fab : {
		backgroundColor: "#6EBFFC",//"#D72160",//"#ED4D4D",//"#266B8D",
	},
	icons: {
		fontSize: 20,
	},
});

const mapStateToProps = (state) => ({
  fab: state.local.fab
})

const mapDispatchToProps = (dispatch) => {
	return {
		ToggleFab: () => dispatch(localActions.ToggleFab()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfoFooter);