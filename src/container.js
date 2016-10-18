import React,{Component} from 'react';
import{
  Text, 
  View,
  StyleSheet,
  Platform
} from 'react-native';

export default class Container extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let {style,...other}=this.props;
    return(
      <View  {...other} style={[styles.container,this.props.navbar&&styles.navbarPadding,this.props.tabbar&&{paddingBottom:51},style]}>
        {this.props.children}
      </View>
    );
  }
};

const styles=StyleSheet.create({
  container:{flex:1,backgroundColor:'#f0f0f0'},
  navbarPadding:{...Platform.select({
      ios: {
        paddingTop:70
      },
      android:{
        paddingTop:56
      }
    })
  }
});

//#c8c7cc