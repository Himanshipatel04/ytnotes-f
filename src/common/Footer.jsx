import React from 'react'
import { Link } from 'react-router-dom'
Link

const Footer = () => {
  return (
    <div className='bg-[#AD1457] text-white h-12 tracking-wide flex items-center justify-between px-20 font-semibold'>
     Copyright &copy; 2024 Himanshi 
     <p>Developed by <Link className='underline' to="https://www.linkedin.com/in/himi04/">Himanshi</Link></p>
    </div>
  )
}

export default Footer