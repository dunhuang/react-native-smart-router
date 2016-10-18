import React, {Component} from 'react';
import {Navigator} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {actions as routerActions, Router, Route, TabRoute} from 'react-native-smart-router';
import Home from './home';
import Page1 from './page1';
import Login from './login';
import Message from './message';
import About from './about';

class App extends Component {
  render() {      
    return (
      <Router {...this.props} initial="home">
        <TabRoute name="tabbar">
          <Route component={Home} name="home" title="Home" tabIconName="home"/>
          <Route component={Message} name="message" title="Message" tabIconName="envelope-o"/>
          <Route component={About} name="about" title="About" tabIconName="user"/>
        </TabRoute>
        <Route component={Page1} name="page1" navbar={true} title="Page1" leftBtn={true}/>
        <Route component={Login} name="login" sceneConfig="FloatFromBottom"/>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  router: state.router,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...routerActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
