import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem} from 'native-base'
import PropTypes from 'prop-types';
class componentName extends Component {
  render() {
    return (
      <View>
        <List>
           <ListItem>
              <Text style={styles.items}>Main</Text>
           </ListItem>
           <ListItem>
              <Text style={styles.items}>Test</Text>
           </ListItem>
        </List>
      </View>

    );
  }
}

const styles = StyleSheet.create({
   items: {
      fontFamily: "roboto"
   }
});

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(componentName);

