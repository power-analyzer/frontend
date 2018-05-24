import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

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
      <Container className="pt-3">
        <div className="text-center">
          <h1>Dashboard</h1>
          <Row>
            {
              stats.map((stat, key) => {
                return (<StatCard key={key} stat={stat}/>);
              })
            }
          </Row>
        </div>
      </Container>
    );
  }
}
