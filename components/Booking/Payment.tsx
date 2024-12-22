import PaymentList from '@/data/PaymentList'
import Image from 'next/image'
import React from 'react'

const Payment = () => {
    return (
        <div>
            <h2 className='text-[14px] font-semibold'>Payment Method</h2>
            <div className='grid grid-cols-5 mt-1 pl-2'>
                {PaymentList.map((item: any, index: number) => (
                    <div key={index} className=' w-[50px] 
                    border-[2px]
                    hover:border-yellow-400
                    hover:scale-110 
                    rounded-md
                    transition-all
                    flex items-center 
                    justify-center '>
                        <Image src={item.image} alt={item.name} width={30} height={30} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Payment