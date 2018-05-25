import React, { Component } from 'react';
import { Col, Card, CardTitle, CardBody } from 'reactstrap';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Total Power Consumption',
      fill: false,
      lineTension: 0.1,
      backgroundColor: '#FFCE56',
      borderColor: '#FFCE56',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#FFCE56',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export class SummaryGraph extends Component {

  render() {
    return(
      <Col xs="12" >
				<Card className="p-3 mt-3">
          <Line data={data} />
					<CardBody>
					</CardBody>
				</Card>
			</Col>
    );
  }
}
