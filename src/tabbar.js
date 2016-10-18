import React,{Component} from 'react';
import{
  Text, 
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function TouchTab(props) {
  let {tab, actions, theDisactiveColor, tabTouchStyle, tabStyle, textStyle, iconStyle} = props;
  return (
    <TouchableOpacity style={[styles.eachTouch, tabTouchStyle]} onPress={()=>actions.replaceRouter({name:tab.name})}>
      <View style={[styles.eachView, tabStyle]}>
        {tab.tabIconName && <Icon style={[styles.icon, iconStyle]} name={tab.tabIconName} color={theDisactiveColor} />}
        <Text style={[styles.text,{color:theDisactiveColor}, tabStyle]}>{tab.title}</Text>
      </View>
    </TouchableOpacity>
  );
} 

export default class Tabbar extends Component {
  constructor(props) {
    super(props); 
  }
  render() {
    const {tabs, selectedTab, actions, activeColor, disactiveColor, tabbarStyle, tabTouchStyle, tabStyle, textStyle, iconStyle, ...rest} = this.props;    
    const keys = Object.keys(tabs);
    const theActiveColor = activeColor ? activeColor : Colors.active ;
    const theDisactiveColor = disactiveColor ? disactiveColor : Colors.disactive ;
    let tab;
    return (
       <View style={[styles.wrapView]}>
        { 
          keys.map((v,i)=>{
            if(v === 'passProps') return null;
            tab = tabs[v];
            if(tab.name === selectedTab){
              return (
                <View style={[styles.eachView, styles.eachTouch, tabTouchStyle, tabStyle]} key={i}>
                  {tab.tabIconName && <Icon style={[styles.icon, iconStyle]} name={tab.tabIconName} color={theActiveColor} />}
                  <Text style={[styles.text,{color:theActiveColor}, textStyle]}>{tab.title}</Text>
                </View>  
              )            
            }
            return <TouchTab tab={tab} key={i} actions={actions} theDisactiveColor={theDisactiveColor} tabTouchStyle={tabTouchStyle} tabStyle={tabStyle} textStyle={textStyle} iconStyle={iconStyle}/>
          })
        }
      </View>
    )
  }
}

const {
  width,
  height
} = Dimensions.get("window");

const Colors={
  active:'#ff6600',
  disactive:'#c8c7cc'
}

const styles=StyleSheet.create({
  wrapView:{flex:1,position:'absolute',bottom:0,left:0,right:0,flexDirection: 'row',borderColor:'#ddd',
        borderStyle:'solid','borderTopWidth':StyleSheet.hairlineWidth,backgroundColor:'#f9f9f9'},
  eachTouch:{flex:1,height:50,justifyContent: 'center'},
  eachView:{alignItems:'center'},
  icon:{textAlign:'center',fontSize:30},
  text:{textAlign:'center',fontSize:11},
  dot:{width:8,height:8,borderRadius:4,backgroundColor:'red',position:'absolute',top:4,left:width/6+16}
});