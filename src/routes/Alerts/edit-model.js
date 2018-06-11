import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { DATA_API } from '../../config';

export class EditModel extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);

    this.state = {
      "alert": this.props.alert,
      "isOpen": false,
      "circuits": [],
    }

    axios.get(DATA_API + "/circuits").then((response) => {
      this.setState({
        "circuits": response.data
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let new_alert = this.props.alert;
    let old_alert = this.state.alert;
    if(new_alert && (!old_alert || new_alert.pk !== old_alert.pk)) {
      this.setState({
        "alert": new_alert
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      "alert": {
        ...this.state.alert,
        "fields": {
          ...this.state.alert.fields,
          [name]: value,
        },
      },
    });
  }

  toggle() {
    let isOpen = (this.state.isOpen) ? false : true;
    this.setState({
      "isOpen": isOpen,
    });
  }

  save() {
    let new_alert = this.state.alert;
    axios.post(DATA_API + "/alerts/" + new_alert.pk, new_alert.fields).then((res) => {
      if (res.status === 200) {
        this.toggle();
        this.props.onSuccess(); //Refresh the parent page.
      } else {
        alert("There was a problem.");
      }
    }).catch((error) => {
      console.error(error);
      alert("There was a problem contacting the server." + error);
    })
  }

  delete() {
    let alert_ID = this.state.alert.pk;
    if (window.confirm("Are you sure you want to delete this alert?")) {
      axios.delete(DATA_API + "/alerts/" + alert_ID).then((res) => {
        this.toggle();
        this.props.onSuccess();
      }).catch((er) => {
        alert("Something went wrong. " + er);
      });
    }
  }

  render() {
    if(!this.state.alert) {
      return(<div></div>)
    }
    let alert = this.state.alert;
    let fields = alert.fields;
    let name = (fields.name) ? ("Edit Alert " + fields.name) : ("Edit Alert " + alert.pk);

    let circuit_options = this.state.circuits.map((circuit, key) => {
      let name = (circuit.fields.name) ? (circuit.fields.name): ("Circuit " + circuit.pk);
      return(
        <option key={key} value={circuit.pk}>{name}</option>
      );
    });
    return (
      <Modal isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{name}</ModalHeader>

          <ModalBody>
            <Form>

              <FormGroup>
                <Label>Alert Name</Label>
                <Input type="text" value={fields.name} onChange={this.handleChange} name="name" placeholder="Kitchen Alert" />
              </FormGroup>

              <FormGroup>
                <Label>Email</Label>
                <Input type="email" name="email" value={fields.email} onChange={this.handleChange} placeholder="user@domain.com" autoComplete="name" />
              </FormGroup>

              <FormGroup>
                <Label>Circuit</Label>
                <Input type="select" name="circuit" value={fields.circuit} onChange={this.handleChange}>
                  {circuit_options}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label>Attribute</Label>
                <Input type="text" name="attribute" value={fields.attribute} onChange={this.handleChange} placeholder="magnitude" />
              </FormGroup>

              <FormGroup>
                <Label>Alert Minimum Frequency Limit (Minutes)</Label>
                <Input type="number" name="frequency_limit" value={fields.frequency_limit} onChange={this.handleChange} placeholder="eg. 30 (for a half hour)" />
              </FormGroup>

              <FormGroup>
                <Label>Minimum Value (Amps)</Label>
                <Input type="number" name="min_val" value={fields.min_val} onChange={this.handleChange} placeholder="eg. 10 (leave empty for no min)" />
              </FormGroup>

              <FormGroup>
                <Label>Maximum Value (Amps)</Label>
                <Input type="number" name="max_val" value={fields.max_val} onChange={this.handleChange} placeholder="eg. 10 (leave empty for no max)" />
              </FormGroup>

            </Form>
          </ModalBody>

          <ModalFooter className="d-flex justify-content-between align-items-center">
            <Button color="danger" onClick={this.delete}>Delete</Button>
            <span>
              <Button color="primary" onClick={this.save}>Save</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Close</Button>
            </span>
          </ModalFooter>
        </Modal>
    )
  }
}
