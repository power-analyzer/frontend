import React, { Component } from 'react';
import { Col, Card, CardTitle, CardBody } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

export class StatCard extends Component {

	constructor(props) {
		super(props);
		let stat = props.stat;
		this.state = {
			data: {
				labels: [
					props.stat.name,
					"default",
				],
				datasets: [{
					data: [stat.percent, 1 - stat.percent],
					backgroundColor: [
					'#FFCE56',
					'#FAFAFA',
					]
				}]
			}
		};
	}



  render() {
		//Don't like typing
		let data = this.state.data;
		let stat = this.props.stat;
    return(
      <Col xs="12" md="6" lg="4">
				<Card className="pt-3">
					<Doughnut data={ data } options={{
							legend: {
	        			display: false
	    				}
					}}/>
					<CardBody>
						<CardTitle>
							{stat.name}
						</CardTitle>
					</CardBody>
				</Card>
			</Col>
    );
  }
}
