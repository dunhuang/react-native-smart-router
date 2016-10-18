import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

export default class Page1 extends Component {
  render() {    
    return (
      <View style={{flex:1}}>
        <ScrollView> 
          <Text style={styles.text}>This is page1.</Text>  
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{lineHeight:100, textAlign:'center'},
});
