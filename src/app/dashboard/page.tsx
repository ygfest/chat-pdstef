import React from 'react'
import FileCard from './files-card'
import Header from './header'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 bg-zinc-950 h-screen w-screen'>
      <Header/>
      <FileCard/>
  
      
    </div>
  )
}

export default page