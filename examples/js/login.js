import React,{Component} from 'react';
import{
  Text, 
  View,
  Image,
  TextInput,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <View style={styles.view_textinput}>
          <Text style={styles.text_label}>Account</Text>
          <TextInput 
            style={styles.textinput}
            numberOfLines={1}
            underlineColorAndroid={'transparent'} 
          />
        </View>
        <View style={[styles.view_textinput,styles.view_textinput_pwd]}>
          <Text style={styles.text_label}>Password</Text>
          <TextInput 
              style={styles.textinput}
              numberOfLines={1}
              secureTextEntry={true}
              underlineColorAndroid={'transparent'} 
          />
        </View>
        <View style={styles.btn_container}>
          <TouchableOpacity style={[styles.button, styles.login]} onPress={()=>this.props.actions.pushRouter({name:'home'})}>
            <Text style={styles.buttonText}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const {
  width,
  height
} = Dimensions.get("window");

const styles = StyleSheet.create({
  view_textinput:{
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'#999',
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    flexDirection:'row',
  },
  view_textinput_pwd:{  
    marginTop:0
  },  
  textinput:{  
    backgroundColor:'#fff',
    height:44,
    fontSize:16,
    color:'#333',
    flex:1
  },
  text_label:{
    width:100,
    color:'#999',
    fontSize:14,
    marginTop:14,
  },
  btn_container:{
    margin:20
  },
  text_forgetpwd:{
    color:'#666',
    fontSize: 14,
    textAlign:'right',
    marginRight:20,
  },
  button:{
    height:34,
    backgroundColor:'#f9be00',
    borderRadius:2, 
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10, 
    marginRight:10
  },
  buttonText:{color:'#444'},  
});

