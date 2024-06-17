import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXppemtoYWxlZCIsImEiOiJjbHhobmsxM2UxYTRoMm5yMmNncng5c3doIn0.Ybgma2XqB2-Nfn-VvLkATQ';

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      startPoint: null,
      endPoint: null
    };

    this.mapContainer = React.createRef();
    this.geocoderStart = null;
    this.geocoderEnd = null;
  }

  componentDidMount() {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1
    });

    map.on('load', () => {
      this.setState({ map });

      this.geocoderStart = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Enter start location',
        countries: 'us', // Limit results to the United States
        marker: false // Disable the default marker
      });

      this.geocoderEnd = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Enter end location',
        countries: 'us', // Limit results to the United States
        marker: false // Disable the default marker
      });

      map.addControl(this.geocoderStart);
      map.addControl(this.geocoderEnd, 'top-left');

      this.geocoderStart.on('result', this.handleGeocoderResult.bind(this, 'start'));
      this.geocoderEnd.on('result', this.handleGeocoderResult.bind(this, 'end'));
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }

  componentWillUnmount() {
    if (this.state.map) {
      this.state.map.remove();
    }
  }

  handleGeocoderResult(type, event) {
    const { result } = event;
    const coordinates = result.geometry.coordinates;

    if (type === 'start') {
      this.setState({ startPoint: coordinates });
    } else if (type === 'end') {
      this.setState({ endPoint: coordinates });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { map, startPoint, endPoint } = this.state;

    if (map && startPoint && !prevState.startPoint) {
      map.addSource('start-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: startPoint
          }
        }
      });

      map.addLayer({
        id: 'start-point',
        type: 'circle',
        source: 'start-point',
        paint: {
          'circle-radius': 10,
          'circle-color': '#FF6347'
        }
      });
    }

    if (map && endPoint && !prevState.endPoint) {
      map.addSource('end-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: endPoint
          }
        }
      });

      map.addLayer({
        id: 'end-point',
        type: 'circle',
        source: 'end-point',
        paint: {
          'circle-radius': 10,
          'circle-color': '#4682B4'
        }
      });
    }
  }

  render() {
    const { startPoint, endPoint } = this.state;

    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: '0 0 300px', padding: '20px' }}>
          <h2>Points</h2>
          <div>
            <strong>Start Point:</strong> {startPoint ? startPoint.join(', ') : 'Not selected'}
          </div>
          <div>
            <strong>End Point:</strong> {endPoint ? endPoint.join(', ') : 'Not selected'}
          </div>
        </div>
        <div style={{ flex: '1', position: 'relative' }}>
          <div ref={this.mapContainer} style={{ height: '100%', width: '100%' }} />
          {this.geocoderStart && map && (
            <div
              ref={(el) => {
                if (el && map) {
                  el.appendChild(this.geocoderStart.onAdd(map));
                }
              }}
              style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}
            />
          )}
          {this.geocoderEnd && map && (
            <div
              ref={(el) => {
                if (el && map) {
                  el.appendChild(this.geocoderEnd.onAdd(map));
                }
              }}
              style={{ position: 'absolute', top: '50px', left: '10px', zIndex: 1 }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default MapComponent;
