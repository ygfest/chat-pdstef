'use client'

import React, {useContext, useState} from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { FaAngleLeft } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { SidePanelContext } from '@/app/context/SidePanelProvider';
import Link from 'next/link';


const NavigationBar = () => {
  const context = useContext(SidePanelContext);

  if (!context) {
    throw new Error('SidePanel must be used within a SidePanelProvider');
  }

  const { isOpen, togglePanel } = context;
  

  return (
<div className={`transition-all duration-300 px-4 flex flex-row justify-between items-center bg-zinc-800 text-zinc-200 text-sm mx-auto h-[48px] rounded-lg w-full`}>
      <Link href="dashboard">
      <div className='flex flex-row items-center gap-2'>
        <FaAngleLeft/>
        <p>Dashboard</p>
      </div>
      </Link>
      <div>
        Cloud Computing Module 2.pdf
      </div>
      <div>
        <BsThreeDots/>
      </div>
          
    </div>
    
  )
}

export default NavigationBar