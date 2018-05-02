import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

export class StatCard extends Component {

  render() {
    return(
      <div>
      	<Doughnut data={data} options={{
		    	rotation: 2 * Math.PI * .75,
		      circumference: 2 * Math.PI * .75
		    }}/>
      	<h1></h1>
			</div>
    );
  }
}
