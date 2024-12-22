"use client"
import React, { useContext } from 'react'
import AutoAddress from './AutoAddress'
import Car from './Car'
import Payment from './Payment'
import { CarAmountContext } from '@/context/SelectedCarAmount'
const Booking = () => {
  const screenHeight = window.innerHeight * 0.72;
  const { carAmount, setCarAmount } = useContext(CarAmountContext);
  const callHandler = async ()=>{
    window.location.href = "tel:7976619389"
  }
  return (
    <div className='p-5'>
      <h2 className='text-[25px] font-semibold'>Booking</h2>
      <div className='border-[2px] p-2 rounded-md h-full overflow-hidden'>
        <AutoAddress />
        <Car />
        <Payment />
        <button  onClick={callHandler} className={`w-full bg-yellow-400 p-1 mt-2 rounded-md overflow ${!carAmount ? 'bg-gray-100' : null} `}>Book</button>
      </div>
    </div>
  )
}

export default Booking