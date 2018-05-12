import React, { Component } from 'react';
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
					'#FFFFFF',
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
      <div>
      	<Doughnut data={ data } options={{
						legend: {
        			display: false
    				}
				}}/>
				<h1>{stat.name}</h1>
			</div>
    );
  }
}
