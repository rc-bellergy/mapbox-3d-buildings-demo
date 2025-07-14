"use client";
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function MapComponent() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [clickedBuildingId, setClickedBuildingId] = React.useState(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [114.22343274985437, 22.28364532660606],
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            antialias: true
        });

        map.current.on('style.load', () => {
            const layers = map.current.getStyle().layers;
            const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout['text-field']
            ).id;

            map.current.addLayer(
                {
                    'id': 'add-3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': [
                            'case',
                            ['boolean', ['feature-state', 'clicked'], false],
                            '#ff0000',
                            '#aaa'
                        ],
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );
        });

        map.current.on('click', 'add-3d-buildings', (e) => {
            if (e.features.length > 0) {
                const newClickedBuildingId = e.features[0].id;

                if (newClickedBuildingId === clickedBuildingId) {
                    // Unset the feature state if the same building is clicked again
                    map.current.setFeatureState(
                        { source: 'composite', sourceLayer: 'building', id: newClickedBuildingId },
                        { clicked: false }
                    );
                    setClickedBuildingId(null);
                } else {
                    // Reset the state of the previously clicked building
                    if (clickedBuildingId) {
                        map.current.setFeatureState(
                            { source: 'composite', sourceLayer: 'building', id: clickedBuildingId },
                            { clicked: false }
                        );
                    }
                    // Set the state of the newly clicked building
                    map.current.setFeatureState(
                        { source: 'composite', sourceLayer: 'building', id: newClickedBuildingId },
                        { clicked: true }
                    );
                    setClickedBuildingId(newClickedBuildingId);
                }
            }
        });

        return () => map.current.remove();
    }, []);

    return (
        <div ref={mapContainer} className="w-screen h-screen" />
    );
}

export default MapComponent;