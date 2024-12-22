"use client"
import { DirectionsDataContext } from '@/context/DirectionsDataContext'
import { CarAmountContext } from '@/context/SelectedCarAmount'
import CarList from '@/data/CarList'
import Image from 'next/image'
import React, { useContext, useState } from 'react'

const Car = () => {
    const { directionRoutData, setDirectionsRouteData } = useContext(DirectionsDataContext)
    const [selectedCar, setSelectedCar] = useState<any>();
   const { carAmount, setCarAmount } = useContext(CarAmountContext)

    const getCost = (charges: any) => { 
        return (charges * directionRoutData?.routes[0]?.distance * 0.001).toFixed(2)
    }
    return (
        <div className='mt-3'>
            <h2 className='font-semibold'>Select Car</h2>
            <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-3'>
                {CarList.map((item: any, index: number) => (
                    <div key={index} className={`m-1 p-2 border-[2px] hover:border-yellow-400 
                    cursor-pointer ${index == selectedCar ? 'border-yellow-400 border-[2px]' : null} `} onClick={() => { setSelectedCar(index); setCarAmount(getCost(item.charges)) }}>
                        <Image src={item.image} alt={item.name} width={70} height={90} className='w-full' />
                        <h2 className='text-[12px] mt-2'>
                            {item.name}
                            {directionRoutData?.routes ?
                                <span className='float-right'>{getCost(item.charges)}$</span> : null
                            }
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Car