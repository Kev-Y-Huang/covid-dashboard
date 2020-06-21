import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {Popup, StaticMap} from 'react-map-gl';
import {fetchData} from '../api';

class Mapbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredFeature: null,
            viewport: {
                longitude: -93.1669,
                latitude: 44.8041,
                zoom: 4,
                bear: 0,
                pitch: 0,
                maxZoom: 8
            },
            data: []
        };
    }

    async componentWillMount() {
        this.setState({data: await fetchData()});
    }

    render() {
        console.log(this.state.data);

        const layers = new ScatterplotLayer({
            id: 'covid-cases',
            data: this.state.data,
            stroked: false,
            filled: true,
            getPosition: d => d.coordinates,
            getRadius: d => Math.sqrt(d.cases) * 500,
            getFillColor: [255, 200, 0],
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
                <StaticMap
                    mapStyle={'mapbox://styles/mapbox/dark-v10'}
                    mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}/>
            </DeckGL>
        )
    }
}

export default Mapbox;