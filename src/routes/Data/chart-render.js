import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

import { DATA_API } from '../../config.js';

export default class ChartRender extends Component {
  constructor(props) {
    super(props);
    //Mapping 'this' to the Component.
    this.add_dataset = this.add_dataset.bind(this);
    this.fetch_and_add = this.fetch_and_add.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);

    this.state = {
      "chart": {
        "datasets": [],
        "labels": []
      },
      "time": "",
      "test": true
    };

    var now = new Date();
    now.setDate(now.getDate() - 365);
    this.state.time = now;


  }

  componentDidMount() {
    for (let chart of this.props.charts) {
      this.fetch_and_add(chart.name, chart.model, chart.id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let nextState = Object.assign({}, prevState);
    nextState.chart = {
      "labels": [],
      "datasets": []
    };
    return(nextState);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // TODO: Check the diffs of props.chart to see which specific channels need
    // to be reloaded. Right now it fetches everything over again.
    // if(this.state.chart.datasets.length != prevState.chart.datasets.length) {
    if(this.state.chart.datasets.length === 0) {
      for (let chart of this.props.charts) {
        this.fetch_and_add(chart.name, chart.model, chart.id);
      }
    }
  }

  fetch_and_add(name, model, id) {
    let time = this.state.time;
    axios.get(DATA_API + "/"+ model + "/" + id + "/" + time.toISOString())
      .then((res) => {
        this.add_dataset(name, res.data.data, res.data.labels);
      });
  }

  add_dataset(name, data, labels) {
    let state = this.state;
    this.setState((prevState, props) => {
      let nextState = Object.assign({}, prevState);

      if(!state.chart.labels || state.chart.labels.length === 0) {
        nextState.chart.labels = labels;
      }
      nextState.chart.datasets.push({
        label: name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      });
      return nextState;
    });
  }

  render() {
    return(
      <Container fluid className="text-center">
        <Line data={this.state.chart} />
      </Container>

    );
  }
}
