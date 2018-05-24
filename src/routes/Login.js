import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';

import logo from '../media/logo.png';

export class LoginRoute extends Component {
  render() {
    return(
      <Container>
        <Row>
          <Col xs="12" md={{"size": 6, "offset": 3}} lg={{"size": 4, "offset": 4}} className="text-center mt-5">
            <img src={logo} alt="Power Analyzer Logo" className="img-fluid"/>
            <Form className="mt-3">
              <FormGroup>
                <Input type="text" name="username" id="username" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" id="examplePassword" placeholder="Password" />
              </FormGroup>
              <Link to="dashboard" className="btn btn-warning">Login</Link>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
