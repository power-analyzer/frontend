import axios from 'axios';
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';

import { DATA_API } from '../../config';
import { EditModel } from './edit-model';

export class AlertsRoute extends Component {
  constructor(props) {
    super(props);
    this.get_alerts = this.get_alerts.bind(this);
    this.selectCircuit = this.selectCircuit.bind(this);
    this.state = {
      "alerts": [],
      "modelOpen": false
    }
    this.editModel = React.createRef();


    this.get_alerts();
  }

  get_alerts() {
    axios.get(DATA_API + "/alerts").then((response) => {
      this.setState({
        "alerts": response.data,
      });
    });
  }

  selectCircuit(circuit_index) {
    console.log(circuit_index);
    this.setState({
      "selectedAlert": this.state.alerts[circuit_index],
      "modelOpen": true,
    });
    this.editModel.current.toggle();
  }

  render() {
    let alerts = this.state.alerts.map((alert, key) => {
      let fields = alert.fields;
      let name = (fields.name) ? (":" + fields.name) : ("");
      let html_alert = <ListGroupItem key={key} className="d-flex justify-content-between align-items-center" action onClick={() => this.selectCircuit(key)}>
        Alert for Circuit {fields.circuit + name}
        <span className="text-right">
          <Badge pill>{fields.min_val} {'<='} {fields.attribute} {'<='} {fields.max_val}</Badge>
        </span>
      </ListGroupItem>
      return html_alert
    });

    return(
      <Container className="pt-3">
        <h1>Alerts</h1>
        <Row>
          <Col xs="12" md={{'size':8, 'offset': 2}}>
            <ListGroup>
              {alerts}
            </ListGroup>
          </Col>
        </Row>
        <EditModel ref={this.editModel} alert={this.state.selectedAlert} onSuccess={this.get_alerts}/>
      </Container>
    );
  }
}
