import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';

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
                width: '50vw',
                height: '80vh',
                maxZoom: 8
            }
        };
    }

    _onHover = event => {
        const {
            features,
            srcEvent: {offsetX, offsetY}
        } = event;
        const hoveredFeature = features && features.find(f => f.layer.id === 'state-label');
        this.setState({hoveredFeature, x: offsetX, y: offsetY});
    };

    _renderTooltip() {
        const {hoveredFeature, x, y} = this.state;

        return (
            hoveredFeature && (
                <div className="tooltip" style={{left: x, top: y}}>
                    <div>State: {hoveredFeature.properties.name}</div>\
                </div>
            )
        );
    }

    render() {
        return (
            <ReactMapGL
                {...this.state.viewport}
                mapStyle={'mapbox://styles/mapbox/dark-v10'}
                mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
                onViewportChange={(viewport) => this.setState({viewport})}
                onHover={this._onHover}
            >
                {this._renderTooltip()}
            </ReactMapGL>
        )
    }
}

export default Mapbox;