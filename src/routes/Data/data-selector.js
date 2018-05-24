import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';

import { DATA_API } from '../../config.js';

export default class DataSelector extends Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.fetchDeviceCircuits = this.fetchDeviceCircuits.bind(this);
    this.addCircuit = this.addCircuit.bind(this);
    this.removeCircuit = this.removeCircuit.bind(this)

    this.state = {
      "devices": [],
      "circuits": [],
      "charts": this.props.charts,
      "selectedCircuit": null,
      "selectedDevice": null,
    };
  }
  componentDidMount() {
    axios.get(DATA_API + "/devices")
      .then((res) => {
        let state = this.state;
        state.devices = res.data;
        this.setState(state);
      })
  }

  handleSelectChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    let state = this.state;
    state[name] = value;
    this.setState(state);

    if(name === "selectedDevice") {
      this.fetchDeviceCircuits(value);
    }

  }

  fetchDeviceCircuits(id) {
    axios.get(DATA_API + "/devices/" + id + "/circuits").then((res) => {
      let state = this.state;
      state.circuits = res.data;
      this.setState(state);
    })
  }

  addCircuit() {
    // TODO: FIX THIS.
    let state = this.state;
    let circuitID = state.selectedCircuit;
    let circuit = state.circuits.filter((circuit) => {
      if(circuit.pk === Number(circuitID)){
        return true;
      } else {
        return false;
      }
    });
    circuit = circuit[0];
    let circuitName = circuit.pk + " " + circuit.fields.name;
    let model = circuit.model.split('.')[1]; // turn "datapoints.circuit" -> "circuit"
    model += "s";
    state.charts.push({
      "id": circuitID,
      "name": circuitName,
      "model": model,
    });
    this.setState(state);
    this.props.update(this.state.charts);
  }

  removeCircuit(chartIndex) {
    let state = this.state;
    state.charts.splice(chartIndex, 1); //Removes 1 item at `chartIndex`
    this.setState(state);
    this.props.update(this.state.charts);
  }

  render() {
    let state = this.state;
    if(!state.devices) {
      return(
        <Row>
          <p>Loading...</p>
        </Row>
      )
    }

    let devices = state.devices.map((device, key) => {
      return(
        <option key={key} value={device.pk}>{device.fields.name}</option>
      );
    });

    let circuits = state.circuits.map((circuit, key) => {
      return(
        <option key={key} value={circuit.pk}>{ circuit.pk + " " + circuit.fields.name}</option>
      );
    });

    let extraOption = (state.selectedDevice) ? (
      <option default value="">Select a circuit...</option>
    ) : (
      <option default value="">Select a device above</option>
    );

    let circuitSelector = <div className="form-group">
      <label for="circuit">Circuit</label>
      <select className="form-control" id="circuit" name="selectedCircuit" value={this.selectedCircuit} onChange={this.handleSelectChange}>
        {extraOption}
        {circuits}
      </select>
    </div>;

    let charts = state.charts.map((chart, key) => {
      return(
        <li key={key}>{chart.model + " " + chart.id + " " + chart.name}</li>
      )
    })

    return(
      <Row>
        <Col xs="12" md="6" lg="3">
          {/*devices*/}
            <div className="form-group">
              <label for="device">Device</label>
              <select className="form-control" id="device" name="selectedDevice" value={this.selectedDevice} onChange={this.handleSelectChange}>
                <option default value="">Select a device...</option>
                {devices}
              </select>
            </div>

          {/*circuits*/}
          {circuitSelector}
          <Button onClick={this.addCircuit}>Add</Button>
        </Col>
        <Col xs="12" md="6" lg="3">
        <ul>
          {charts}
        </ul>
        {/*list*/}
        </Col>
      </Row>
    );
  }
}
