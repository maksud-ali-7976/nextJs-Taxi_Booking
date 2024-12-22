import { DirectionsDataContext } from '@/context/DirectionsDataContext'
import React, { useContext } from 'react'

const TimeDistance = () => {
    const { directionRoutData } = useContext(DirectionsDataContext)
    return directionRoutData.routes && (
        <div className='bg-yellow-500 p-3'>

            <h2 className='text-yellow-100 opacity-80 text-[14px]'>
                Distance:<span className='font-semibold mr-3 text-black '>{(directionRoutData?.routes[0]?.distance * 0.001).toFixed(2)}KM</span>
                Time: <span className='font-semibold text-black '>{(directionRoutData?.routes[0]?.duration / 60).toFixed(2)}Min</span>
            </h2>

        </div>
    )
}

export default TimeDistance