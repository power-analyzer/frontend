import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import ChartRender from './chart-render';
import DataSelector from './data-selector';

export class DataRoute extends Component {
  constructor(props) {
    super(props);
    this.updateCharts = this.updateCharts.bind(this);

    this.state = {
      "charts": [
        {"name": "Test", "model": "circuits", "id": 1}
      ]
    };
  }

  updateCharts(charts) {
    let state = this.state;
    state.charts = charts;
    this.setState(state);
  }

  render() {
    return(
      <Container fluid className="text-center">
        <h1>Power Consumption</h1>
        <DataSelector update={this.updateCharts} charts={this.state.charts}/>
        <ChartRender charts={this.state.charts}/>
      </Container>

    );
  }
}
