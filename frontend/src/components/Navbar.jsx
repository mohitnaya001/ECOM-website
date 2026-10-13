import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='Navbar shadow-md w-full bg-white px-6 py-4 flex items-center justify-between'> 
        <div className='Navbar-brand text-2xl font-bold text-blue-600'>
            <Link to="/">
            <img src='' alt='' className='Navbar-logo'/>
            Ecom<span className='text-gray-800 '>Web</span></Link>
        </div>
        <ul className='Navbar-links  hidden md:flex items-center gap-6'>
            <li><Link to="/" className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium" > Home </Link> </li>
            <li><Link to="/shop" className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium" >Shop</Link></li>
            <li><Link to="/cart" className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium">Cart ({cartItems})</Link></li>
            <li><Link to="/profile" className="text-gray-700 hover:text-blue-600 transition duration-300 font-medium" >Profile</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar 