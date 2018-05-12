import React, { Component } from 'react';

import { StatCard } from './stat-card';

export class DashboardRoute extends Component {
  render() {
    var stats = [
      {
        "name": "Power Usage",
        "percent": .77
      },
      {
        "name": "Average Efficiency",
        "percent": .23
      },{
        "name": "Annual Savings",
        "percent": .33
      }
    ];
    return(
      <div>
        <h1>Dashboard</h1>
        {stats.map((stat, key) => {
          return (
            <StatCard key={key} stat={stat}/>
          );
        })}
      </div>
    );
  }
}
