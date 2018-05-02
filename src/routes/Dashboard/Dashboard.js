import React, { Component } from 'react';

import { StatCard } from './stat-card';

export class DashboardRoute extends Component {
  render() {
    var test_vars = Array.from(Array(5).keys());
    return(
      <div>
        <h1>Dashboard</h1>
        {test_vars.map((key, i) => {
          return (
            <StatCard/>
          );
        })}
      </div>
    );
  }
}
