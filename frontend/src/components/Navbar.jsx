import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='Navbar'> 
        <div className='Navbar-brand'>
            <Link to="/">
            <img src='' alt='Ecomlogo' className='Navbar-logo'/>
            Ecom Web</Link>
        </div>
        <ul className='navbar-links'>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/profile">Profile</Link></li>

        </ul>
    </nav>
  )
}

export default Navbar