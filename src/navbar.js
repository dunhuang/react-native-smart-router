import React,{Component}from 'react';
import{
  Text, 
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  _renderLeftButton(){
    if(this.props.leftBtn===true){
      return(
        <TouchableOpacity style={styles.leftIconWrap} onPress={() => this.props.actions.popRouter()}>
          <Icon name="angle-left" style={styles.leftIcon}/>
        </TouchableOpacity>
      );
    }
    else if(this.props.leftBtn===false){
      return null;
    }
    else if(this.props.leftBtn){
      return this.props.leftBtn;
    }
  }
  render () {
    let {titleStyle, title, right} = this.props;
    return (
      <View style={styles.viewWrap}>
        {this._renderLeftButton()}
        <View style={styles.titleWrap}>
          <Text style={[styles.title, titleStyle && titleStyle]}  numberOfLines={1}>{typeof title==='function' ? title() : title}</Text>
        </View>
        {right ? right : null}
      </View>
    )
  }
};
const styles=StyleSheet.create({
  viewWrap:{position:'absolute',top:0,left:0,right:0,backgroundColor:'rgba(255,255,255,0.9)',alignItems:'stretch',borderColor:'#ddd',
    borderStyle:'solid','borderBottomWidth':StyleSheet.hairlineWidth,flexDirection: 'row',
    ...Platform.select({
      ios: {
        height:70,paddingTop:20,
      },
      android:{
        height:56,paddingTop:0,
      }
    })
  },
  leftIconWrap:{position:'absolute',left:0,paddingTop:10,paddingBottom:10,paddingLeft:15,paddingRight:15,
    ...Platform.select({
      ios: {
        top:20,
      },
      android:{
        top:2
      }
    })
  },
  leftIcon:{fontSize:30,textAlign:'center',fontWeight:'100'},
  title:{fontSize:16},
  titleWrap:{marginLeft:50,marginRight:50,flex:1,justifyContent:'center',alignItems:'center'},
});
