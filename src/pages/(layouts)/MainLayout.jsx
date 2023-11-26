import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function RootScreen () {
  return (
    <div className='animated-element'>
      <header>
        <nav>
          <h1>Uzi</h1>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='about'>About</NavLink>
          <NavLink to='help'>Help</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootScreen
