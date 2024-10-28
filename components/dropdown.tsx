'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import arrow from '../public/icon/arrow-right.svg'

interface DropdownProps {
    review?: any;
    title: string;
    
}


const Dropdown = ({review, title}: DropdownProps) => {
    const [open, toggleOpen] = useState(false)
  return (
    <div className='flex flex-1 flex-col border border-red-500 justify-center' onClick={() => toggleOpen(!open)}>
        <div className='py-8 px-4 border border-blue-500 flex flex-1'>
            <div className='font-bold'>{title}</div>
        </div>
        <span className={`${open ? '-rotate-90' :'rotate-90'} transition-all duration-300`} >
            <Image src={arrow} width={30} height={24} alt='arrow' />
        </span>
    </div>
  )
}

export default Dropdown