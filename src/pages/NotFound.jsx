import React from 'react'
import notfound from '../assets/notfound.svg'

const NotFound = () => {
  return (
    <div className='flex flex-col gap-20 justify-center items-center w-full h-screen'>
        <img src={notfound} alt="" className='w-[400px]' />
        <p className='text-stone-700 font-medium'>Page Not Found</p>
    </div>
  )
}

export default NotFound