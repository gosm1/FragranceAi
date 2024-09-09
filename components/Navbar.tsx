import React from 'react'
import logo from '@/assets/logo.png'
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className='blurBackground z-20 top-0 sticky  py-4 flex items-center justify-around '>
            <a href='/'><Image src={logo} alt='logo' className='w-[150px] md:w-[230px]'/></a>
            <ul className='flex justify-center items-center gap-4 md:gap-8 text-black font-medium'>
                <li><a href='/'>Home</a></li>
                <li><a href='/perfume-recommendation'>Recommendation</a></li>
            </ul>
        </nav>
  )
}

export default Navbar
