import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, StyleSheet,Alert} from 'react-native';

export default class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {  
    return (
      <ScrollView style={{flex:1}}>
        <Text style={styles.text}>This is Home. Current route name is "{this.props.router.currentRoute}"</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{this.props.actions.routes.page1()()}}>
          <Text style={styles.buttonText}>Page 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.actions.pushRouter({name: 'login'})}>
          <Text style={styles.buttonText}>login</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text:{lineHeight:100, textAlign:'center'},
  button:{marginTop:10,height:34,borderColor:'#ccc',borderWidth:0.5,backgroundColor:'#fff',borderRadius:2, justifyContent:'center',alignItems:'center',marginLeft:10, marginRight:10},
  buttonText:{color:'#444'},  
});
