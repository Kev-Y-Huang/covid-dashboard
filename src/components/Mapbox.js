import React, {Component} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';
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
            }
        };
    }

    async componentDidMount() {
        this.setState({
            layer: new ScatterplotLayer({
                id: 'covid-cases',
                data: await fetchData(),
                stroked: false,
                filled: true,
                getPosition: d => d.coordinates,
                getRadius: d => Math.log(d.cases) * 3000,
                getFillColor: [255, 200, 0]
            })
        });
    }

    render() {
        console.log(this.state.layer);
        return (
            <DeckGL
                initialViewState={this.state.viewport}
                style={{'position': 'relative'}}
                width={'50vw'}
                height={'50vh'}
                controller={true}
                layers={this.state.layer}
                onHover={this._onHover}
            >
                <StaticMap
                    mapStyle={'mapbox://styles/mapbox/dark-v10'}
                    mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}/>>
            </DeckGL>
        )
    }
}

export default Mapbox;