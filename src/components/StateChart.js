import React, {Component} from 'react';
import {fetchStateData} from '../api';
import {Line} from 'react-chartjs-2';

class StateChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: props.state,
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Cases',
                        data: [],
                        fill: true,
                        borderColor: 'red'
                    }
                ]
            },
            sort: props.sort
        }
    }

    async componentDidMount() {
        this.loadData(this.props.state);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.state !== this.props.state) {
            this.setState({state: this.props.state});
            this.loadData(this.props.state);
        }
    }

    async loadData(state) {
        const data = await fetchStateData(state);
        this.setState({
            chartData: {
                labels: data.dates,
                datasets: this.state.sort === 'daily' ? [
                    {
                        label: 'hospitalized Currently',
                        data: Object.values(data.hospitalizedCurrently),
                        fill: true,
                        borderColor: 'purple'
                    },
                    {
                        label: 'Increase in Cases',
                        data: Object.values(data.positiveIncrease),
                        fill: true,
                        borderColor: 'orange'
                    },
                    {
                        label: 'Increase in Deaths',
                        data: Object.values(data.deathIncrease),
                        fill: true,
                        borderColor: 'yellow'
                    }
                ] : [
                    {
                        label: 'Confirmed',
                        data: data.confirmed,
                        fill: true,
                        borderColor: 'red'
                    },
                    {
                        label: 'Deaths',
                        data: Object.values(data.deaths),
                        fill: true,
                        borderColor: 'blue'
                    },
                    {
                        label: 'Recovered',
                        data: Object.values(data.recovered),
                        fill: true,
                        borderColor: 'green'
                    }
                ]
            }
        });
    }

    render() {
        return (
            <div className={"chart"}>
                <Line data={this.state.chartData}/>
            </div>
        )
    }
}

export default StateChart;
