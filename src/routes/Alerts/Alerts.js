import axios from 'axios';
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
} from 'reactstrap';

import { DATA_API } from '../../config';
import { EditModel } from './edit-model';

export class AlertsRoute extends Component {
  constructor(props) {
    super(props);
    this.get_alerts = this.get_alerts.bind(this);
    this.selectCircuit = this.selectCircuit.bind(this);
    this.add_alert = this.add_alert.bind(this);
    
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
    this.setState({
      "selectedAlert": this.state.alerts[circuit_index],
      "modelOpen": true,
    });
    this.editModel.current.toggle();
  }

  add_alert() {
    let new_alert = {
      "circuit": 1,
      "frequency_limit": 30,
      "email": "user@domain.com",
      "attribute": "magnitude",
    }
    axios.post(DATA_API + "/alerts", new_alert).then((response) => {
      console.log(response);
      if(response.data.status === "success") {
        // Response is good
        this.setState({
          "selectedAlert": response.data.alert
        });
        this.editModel.current.toggle();
      } else {
        console.warn(response);
        alert("There was a problem creating an alert.\n See log for more info.");
      }
    }).catch((er) => {
      alert("There was a problem. " + er);
    })
  }

  render() {
    let alerts = this.state.alerts.map((alert, key) => {
      let fields = alert.fields;
      let alert_name = (fields.name) ? (fields.name) : ("Alert " + alert.pk);
      let html_alert = <ListGroupItem key={key} className="d-flex justify-content-between align-items-center" action onClick={() => this.selectCircuit(key)}>
        {alert_name}
        <span className="text-right">
          <Badge pill>{"Circuit " + fields.circuit}</Badge>{' '}
          <Badge pill>{fields.min_val} {'<='} {fields.attribute} {'<='} {fields.max_val}</Badge>
        </span>
      </ListGroupItem>
      return html_alert
    });

    return(
      <Container className="pt-3">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h1>Alerts</h1>
            <Button onClick={this.add_alert}>Add Alert</Button>
          </Col>
        </Row>
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
