import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMenu } from "react-icons/io5"
import logo from "../assets/logo.png"

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const onToggle = () =>{
        setVisible(!visible)
    }

  return (
    <>
        <div className='w-full bg-background text-light text-md h-[65px] relative shadow inset shadow-top-2'>
            <div className='w-[90%] h-full m-auto flex items-center justify-between '>
                <div className='h-[60px] w-[108px]'>
                    <img className='h-full w-full' src={logo} alt="logo" />
                </div>
                <div className= {`absolute sm:relative sm:top-0 sm:left-0 sm:z-0 sm:w-fit sm:min-h-fit ${visible ? 'min-h-[50vh] w-full p-4 top-[65px] flex justify-center text-[18px] left-0 bg-background duration-500 z-[-1] ' : 'z-[-1] w-full left-0 duration-500 top-[-300%] bg-background'}`} >
                    <ul className='flex flex-col gap-8 text-center items-center sm:flex-row'>
                        <li className='hover:text-accent duration-300'><Link to={'/'}> Home </Link></li>
                        <li className='hover:text-accent duration-300'><Link to={'/vehicles'}> Vehicles </Link></li>
                        <li className='hover:text-accent duration-300'><Link to={'/booking'}> Booking </Link></li>
                        <li className='hover:text-accent duration-300'><Link to={'/account'}> Account </Link></li>
                    </ul>
                </div>
                <div className='flex items-center gap-4'>
                    <Link to={'/login'} className='px-4 py-2 rounded flex bg-white text-background text-sm font-bold hover:bg-light duration-500'>Sign In</Link>
                    <IoMenu className='w-7 h-7 sm:hidden cursor-pointer' onClick={onToggle} />
                </div>
                
            </div>
        </div>
    </>
)
}

export default Navbar