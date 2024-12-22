"use client"
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs"
import React from 'react'
const NaveBar = () => {
    return (
        <div className='flex  justify-between p-1 bg-yellow-300 text-xl text-white  px-6 shadow-lg'>
            <div className='flex  items-center gap-10'>
                <Image src='/logo.png' alt='logo' width={90} height={40} />

                <div>
                    <ul className=' hidden md:flex gap-4 '>
                        <li className='hover:bg-slate-400 p-2 rounded-md'>Home</li>
                        <li className='hover:bg-slate-400 p-2 rounded-md'>Pricing</li>
                        <li className='hover:bg-slate-400 p-2 rounded-md'>Help</li>
                    </ul>
                </div>
            </div>
            <UserButton />
        </div>
    )
}

export default NaveBar