import React from 'react'
import Navbar from './Navbar'

function Header() {
  return (
    <header>
      <div className='nav-area'>
        <a href="/#" className='logo'>Frontend pathshala</a>
        <Navbar />
      </div>
    </header>
  )
}

export default Header
