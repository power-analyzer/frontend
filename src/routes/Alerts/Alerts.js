import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';

export class AlertsRoute extends Component {
  render() {
    return(
      <Container className="pt-3">
        <h1>Alerts</h1>
        <Row>
          <Col xs="12" md={{'size':8, 'offset': 2}}>
            <ListGroup>
              <ListGroupItem className="justify-content-between">Cras justo odio <Badge pill>14</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Dapibus ac facilisis in <Badge pill>2</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Morbi leo risus <Badge pill>1</Badge></ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
