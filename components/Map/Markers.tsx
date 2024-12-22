import { DestinationCoordinatesContext } from '@/context/DestinationCoordinates';
import { SourceCoordinatesContext } from '@/context/SourceCoordinats';
import { UserLocationContext } from '@/context/UserLocationContext'
import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'

const Markers = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userLocations, setUserLocations } = useContext(UserLocationContext);
    const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCoordinatesContext);
    const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordinatesContext);

    return (
        <div>


            <Marker longitude={userLocations?.long} latitude={userLocations?.lat} anchor="bottom" >
                <img src="/pin.png" className='w-[30px]' />
            </Marker>


            {/*source marker */}
            {
                sourceCoordinates.length !== 0 &&
                <Marker longitude={sourceCoordinates?.long} latitude={sourceCoordinates?.lat} anchor="bottom" >
                    <img src="/location.png" className='w-[30px]' />
                </Marker>
            }

            {/*destinations marker  */}
            {
                destinationCoordinates.length !== 0 &&
                <Marker longitude={destinationCoordinates?.long} latitude={destinationCoordinates?.lat} anchor="bottom" >
                    <img src="/location.png" className='w-[30px]' />
                </Marker>
            }
        </div>
    )
}

export default Markers