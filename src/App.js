import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import {
  LoginRoute,
  DataRoute,
  DashboardRoute,
  AlertsRoute,
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
            <Route path='/alerts' component={AlertsRoute}/>
            <Route exact path='/' component={LoginRoute}/>
            {/*Add more here*/}
          </Switch>
      </div>
    );
  }
}

export default App;
