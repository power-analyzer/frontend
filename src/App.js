import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Container } from 'reactstrap';

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
        <Container className="pt-3">
          <Switch>
            <Route path='/dashboard' component={DashboardRoute}/>
            <Route path='/data' component={DataRoute}/>
            <Route exact path='/' component={LoginRoute}/>
            {/*Add more here*/}
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
