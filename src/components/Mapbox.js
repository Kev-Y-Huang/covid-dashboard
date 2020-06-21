import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {Popup, StaticMap} from 'react-map-gl';
import {fetchData} from '../api';
import Select from 'react-select';

class Mapbox extends Component {
    options = [
        {value: 'confirmed', label: 'Confirmed'},
        {value: 'deaths', label: 'Deaths'},
        {value: 'recovered', label: 'Recovered'}
    ];

    constructor(props) {
        super(props);
        this.state = {
            hoveredFeature: null,
            viewport: {
                longitude: -98.5795,
                latitude: 39.8283,
                zoom: 4,
                bear: 0,
                pitch: 0,
                maxZoom: 8
            },
            data: [],
            selectedValue: 'confirmed'
        };
    }

    async componentDidMount() {
        const data = await fetchData('confirmed');
        this.setState({data});
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedValue !== this.state.selectedValue) {
            const data = await fetchData(this.state.selectedValue);
            this.setState({data});
        }
    }

    handleChange = e => {
        this.setState({selectedValue: e.value});
    };

    render() {
        const max = Math.sqrt(this.state.data.reduce((max, p) => p.cases > max ? p.cases : max, 1));

        const layers = new ScatterplotLayer({
            id: 'covid-cases',
            data: this.state.data,
            filled: true,
            opacity: 0.5,
            getPosition: d => d.coordinates,
            getRadius: d => Math.sqrt(d.cases) * 250,
            getFillColor: d => [255, 255 - Math.sqrt(d.cases) / max * 255, 0],
            // Enable picking
            pickable: true,
            // Update app state
            onHover: info => this.setState({
                hoveredObject: info.object,
                pointerX: info.x,
                pointerY: info.y
            })
        });

        return (
            <DeckGL
                initialViewState={this.state.viewport}
                style={{position: 'relative', textAlign: 'center'}}
                width={'100%'}
                height={'100%'}
                controller={true}
                layers={layers}
                getTooltip={info => info.object ? {
                    html: `<p><b>${info.object.name}</b><br>cases: ${info.object.cases}</p>`
                } : null}
            >
                <div className={'control-panel'}>
                    <Select
                        placeholder={"Confirmed"}
                        value={this.options.find(obj => obj.value === this.selectedValue)}
                        options={this.options}
                        onChange={this.handleChange}
                    />
                </div>
                <StaticMap
                    mapStyle={'mapbox://styles/mapbox/dark-v10'}
                    mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}/>
            </DeckGL>
        )
    }
}

export default Mapbox;