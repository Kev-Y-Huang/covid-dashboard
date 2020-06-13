import React, {Component} from 'react';
import {fetchData} from '../api';
import {Line} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: props.country,
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
            }
        }
    }

    async componentDidMount() {
        this.loadData(this.props.country);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.country !== this.props.country) {
            this.setState({country: this.props.country});
            this.loadData(this.props.country);
        }
    }

    async loadData(country) {
        const data = await fetchData(country);
        this.setState({
            chartData: {
                labels: Object.keys(data.timeline.cases),
                datasets: [
                    {
                        label: 'Cases',
                        data: Object.values(data.timeline.cases),
                        fill: true,
                        borderColor: 'red'
                    },
                    {
                        label: 'Deaths',
                        data: Object.values(data.timeline.deaths),
                        fill: true,
                        borderColor: 'blue'
                    },
                    {
                        label: 'Recovered',
                        data: Object.values(data.timeline.recovered),
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
                {/* <Bar
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
                <Pie
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                /> */}
            </div>
        )
    }
}

export default Chart;
