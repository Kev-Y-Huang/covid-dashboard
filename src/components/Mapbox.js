import React, {Component} from 'react';
import MapGL, {GeolocateControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

class Mapbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -93.1669,
            lat: 44.8041,
            zoom: 4
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
    }

    render() {
        return (
            <div className={'mapbox'}>
                <div ref={el => this.mapContainer = el} />
            </div>
        )
    }
}

export default Mapbox;