"use client"
import { UserLocationContext } from '@/context/UserLocationContext'
import React, { useContext, useEffect, useRef } from 'react'
import { Map } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from './Markers';
import { SourceCoordinatesContext } from '@/context/SourceCoordinats';
import { DestinationCoordinatesContext } from '@/context/DestinationCoordinates';
import { Unbounded } from 'next/font/google';
import { DirectionsDataContext } from '@/context/DirectionsDataContext';
import MapBoxRoute from './MapBoxRoute';
import TimeDistance from './TimeDistanece';
const BASE_URL_DIRECTION_ROUTE = "https://api.mapbox.com/directions/v5/mapbox/driving/"
const MapBox = () => {
    const { userLocations } = useContext(UserLocationContext)
    const mapRef = useRef<any>(null);
    const { sourceCoordinates } = useContext(SourceCoordinatesContext);
    const { destinationCoordinates } = useContext(DestinationCoordinatesContext);
    const { directionRoutData, setDirectionsRouteData } = useContext(DirectionsDataContext)
    useEffect(() => {
        if (sourceCoordinates) {
            mapRef.current?.flyTo({
                center: [sourceCoordinates.long,
                sourceCoordinates.lat],
                durations: 2500
            })
        }
    }, [sourceCoordinates])
    useEffect(() => {
        if (destinationCoordinates) {
            mapRef.current?.flyTo({
                center: [destinationCoordinates.long,
                destinationCoordinates.lat
                ],
                durations: 25000
            })
        };
        if (sourceCoordinates && destinationCoordinates) {
            getAddressRouteDirections()
        }
    }, [destinationCoordinates])


    const getAddressRouteDirections = async () => {
        try {
            const res = await fetch(`${BASE_URL_DIRECTION_ROUTE}${sourceCoordinates.long},${sourceCoordinates.lat};${destinationCoordinates.long},${destinationCoordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await res.json();
            setDirectionsRouteData(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='p-5'>
            <h2 className='text-xl font-semibold'>Map</h2>
            <div className=' mt-3 rounded-lg overflow-hidden'>
                {
                    userLocations ? <Map
                        ref={mapRef}
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                        initialViewState={{
                            longitude: userLocations?.long,
                            latitude: userLocations?.lat,
                            zoom: 14
                        }}
                        style={{ width: '100%', height: 450 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                    >
                        <Markers />
                        {
                            directionRoutData?.routes ? <MapBoxRoute coordinates={directionRoutData?.routes[0]?.geometry?.coordinates} /> : null
                        }
                    </Map> : null
                }

            </div>
            <div className='absolute right-[20px] bottom-[80px] z-20  hidden md:block'>
                <TimeDistance />
            </div>
        </div>
    )
}

export default MapBox