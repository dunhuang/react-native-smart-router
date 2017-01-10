import React, { Component } from 'react';
import { Navigator, View, Text, BackAndroid} from 'react-native';
import Container from './src/container';
import Navbar from './src/navbar';
import Tabbar from './src/tabbar';
import * as actions from './src/actions';
import reducer from './src/reducer';
const emptyFn = function(){};

const actionTypes = actions.actionTypes;

const actionMap = {
  push: actionTypes.ROUTER_PUSH,
  replace: actionTypes.ROUTER_REPLACE,
  reset: actionTypes.ROUTER_RESET,
};

const schemaDefault = {
  sceneConfig: Navigator.SceneConfigs.FloatFromRight,
  container: Container
}

class Route extends Component {
  className() {
    return 'Route';
  }
  render() {
    return null;
  }
}

class TabRoute extends React.Component {
  className() {
    return 'TabRoute';
  }

  render() {
    return null;
  }
}

class Router extends Component {
  constructor(props) {
    super(props);
    const { actions = {}, dispatch, onDidFocus = emptyFn, onWillFocus = emptyFn} = this.props;
    actions.routes = {};
    this.routes = {};
    this.initial = { name: this.props.initial };

    React.Children.forEach(props.children, (child, index) => {
      let name = child.props.name;
      if (child.type.prototype.className() === 'Route') {
        //if props.initial is undefined in Router, it can be defined in Route's props
        if (child.props.initial && !this.initial.name) {
          this.initial.name = name;
        }
        actions.routes[name] = (data = {}) => e => {
          if (typeof(data) !== 'object') {
            data = { data }
          }
          dispatch({
            type: actionMap[data.type || child.props.type] || 'ROUTER_PUSH', //default actionTypes is push
            payload: { name:name, data },
          });
        };
        this.routes[name] = Object.assign({}, {onDidFocus}, {onWillFocus}, child.props);
        if (!child.props.component && !child.props.children) {
          console.error('No route component is defined for name: ' + name);
          return;
        }
      }
      else if (child.type.prototype.className() == 'TabRoute') {
        let {name, chidren, onDidFocus: onTabDidFocus = emptyFn, onWillFocus:onTabWillFocus = emptyFn, ...passProps} = child.props;
        const tabBarName = child.props.name;
        this.routes[tabBarName] = {passProps};
        actions.routes[tabBarName] = {};
        React.Children.forEach(child.props.children, (tabChild, tabIndex) => {
          const tabName = tabChild.props.name;
          let newprops = Object.assign({},  {onDidFocus}, {onDidFocus: onTabDidFocus}, {onWillFocus}, {onWillFocus: onTabWillFocus}, tabChild.props);
          this.routes[tabBarName][tabName] = newprops;
          this.routes[tabName] = Object.assign({}, newprops);
          this.routes[tabName].tabBarName=tabBarName;
          if (tabChild.props.initial || !this.initial.name) {
            this.initial.name = tabName;
            this.initial.tabBarName = tabBarName;
          }
          if (props.initial === tabName) {
            this.initial.tabBarName = tabBarName;
          }
          actions.routes[tabBarName][tabName] = (data = {}) => e => {
            if (typeof(data) !== 'object') {
              data = { data }
            }

            dispatch({
              type: actionMap[data.type || tabChild.props.type] || 'ROUTER_PUSH',
              payload: { name: tabName, tabBarName, data }
            });
          };
        });

      }
    });
    this.initialRoute = this.routes[this.initial.name]
      || console.error('No initial route ' + this.initial.name);

  }
  componentDidMount() {
    this.props.actions.initRouter(this.initial);
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.router.currentRoute !== nextProps.router.currentRoute) {
      this.handleRouteChange(nextProps.router);
    }
  }
  handleBackButton() {
    let routes=this.nav.getCurrentRoutes();
    if (routes.length>1) {
      return this.props.actions.popRouter();
    }
    return false;
  }

  render() {
    if (!(this.props.initial || this.initial)) {
      console.error('No initial attribute!');
    }
    this.initialRoute = this.routes[this.props.initial || this.initial.name];
    if (!this.initialRoute) {
      console.error('No initial route!');
    }
    const currentRoute = this.getRoute(
      this.routes[this.props.router.currentRoute],
      this.props.router
    );
    return (
      <View style={{flex:1}}>
        <Navigator
          configureScene={(route) => route.sceneConfig}
          initialRoute={this.getRoute(this.initialRoute, this.props.router)}
          renderScene={this.renderScene.bind(this)}
          ref={(nav) => this.nav = nav}
          onDidFocus = {this.onDidFocus.bind(this)}
          onWillFocus = {this.onWillFocus.bind(this)}
        />
      </View>
    );
  }
  onDidFocus(route){
    this.routes[route.name].onDidFocus && this.routes[route.name].onDidFocus(route);
  }
  onWillFocus(route){
    this.routes[route.name].onWillFocus && this.routes[route.name].onWillFocus(route);
  }
  renderScene(route, navigator) {
    let Component = route.component;
    let props = Object.assign({}, this.props);
    let actions = props.actions;
    let componentProps = this.routes[route.name];
    delete props.children;
    delete props.initial;
    let child = null;
    let that=this;
    if (Component) {
      child = (
        <Component
          key={route.name}
          {...props}
          {...route.passProps}
          />
      );
    } else {
       child = React.Children.only(componentProps.children);
       child = React.cloneElement(child);
    }
    function _renderNavbar(){
      if(componentProps.navbar===true){
        return <Navbar {...componentProps} {...props}/>
      }
      else if(componentProps.navbar){
        let Nav = componentProps.navbar;
        return <Nav {...componentProps} {...props}/>
      }
      else{
        return null;
      }
    }
    function _renderTabbar(){
      let tabBarRoutes;
      if(componentProps.tabBarName) {
        tabBarRoutes = that.routes[componentProps.tabBarName];
        if (tabBarRoutes.visible===false){
          return null;
        }
        else{
          let TabComponent = tabBarRoutes.passProps.component ? tabBarRoutes.passProps.component : Tabbar;
          return <TabComponent tabs={that.routes[componentProps.tabBarName]} selectedTab={route.name} {...props} {...that.routes[componentProps.tabBarName].passProps}/>
        }
      } else {
        return null;
      }
    }
    return (
      <Container navbar={componentProps.navbar} style={componentProps.containerStyle || {}}>
        {_renderNavbar()}
        {child}
        {_renderTabbar()}
      </Container>
    );
  }

  getRoute(routeProps, router = { data: {} }) {
    const { data = {} } = router;
    if (!routeProps) {
      return {};
    }

    let sceneConfig = routeProps.sceneConfig ? (typeof routeProps.sceneConfig==='string' ? Navigator.SceneConfigs[routeProps.sceneConfig] : routeProps.sceneConfig) : schemaDefault.sceneConfig;
    
    return {
      component: routeProps.component,
      name: routeProps.name,
      passProps: { routerData: data },
      sceneConfig: { ...sceneConfig },
    }
  }

  handleRouteChange(router) {
    const { data = {}, mode } = router;

    if (mode ===actionTypes.ROUTER_POP) {
      const num = data.num || 1;
      const routes = this.nav.getCurrentRoutes();
      if (num < routes.length) {
        this.nav.popToRoute(routes[routes.length - 1 - num]);
      } else {
        this.nav.popToTop();
      }
    }

    if (mode === actionTypes.ROUTER_PUSH) {
      this.nav.push(this.getRoute(
        this.routes[router.currentRoute], router
      ));
    }

    if (mode === actionTypes.ROUTER_REPLACE) {
      this.nav.replace(this.getRoute(
        this.routes[router.currentRoute], router
      ));
    }

    if (mode === actionTypes.ROUTER_RESET) {
      this.nav.immediatelyResetRouteStack([
        this.getRoute(this.routes[router.currentRoute], router)
      ]);
    }
  }
}

module.exports = {
  Router, 
  Route, 
  TabRoute,
  Navbar, 
  Container, 
  actions,
  reducer,
};