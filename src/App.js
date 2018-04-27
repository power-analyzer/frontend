import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {
  LoginRoute,
  DataRoute,
  DashboardRoute
} from './routes/index';
import { MainNav } from './navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainNav/>
          <Switch>
            <Route path='/dashboard' component={DashboardRoute}/>
            <Route path='/data' component={DataRoute}/>
            <Route exact path='/' component={LoginRoute}/>
            // ...
          </Switch>
      </div>
    );
  }
}

export default App;
