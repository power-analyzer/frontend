import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import ChartRender from './chart-render';

export class DataRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "charts": [
        {"name": "Test", "model": "circuits", "id": 1}
      ]
    };
  }

  render() {
    return(
      <Container fluid className="text-center">
        <h1> Data</h1>
        <ChartRender charts={this.state.charts}/>
      </Container>

    );
  }
}
