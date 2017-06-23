import React, { Component } from 'react';
import {Navigator} from 'react-onsenui';
import './App.css';
import Home from './views/home';
import Splash from './views/splash';
import Preview from './views/preview';
import Select from './views/select';

import ActionList from './views/actions_list';

class App extends Component {
    renderPage(route, navigator) {
        const props = route.props || {};
        props.navigator = navigator;
        return React.createElement(route.component, props);
    }
  render() {
      return (
          <Navigator
              initialRoute={{component: Splash}}
              animation = "slide"
              animationOptions={{duration: 0.2, timing: 'ease-in'}}
              renderPage={this.renderPage.bind(this)} />
      );
  }
}

export default App;
