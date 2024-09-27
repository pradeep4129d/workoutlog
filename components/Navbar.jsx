import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const [opened,setOpened]=useState(false)
  return (
    <>
    <div className="shade"></div>
    <div class="background" onClick={()=>{setOpened(opened?false:true)}}>
            <button class={"menu__icon "+opened}>
                <span></span>
                <span></span>
                <span></span>
            </button>
    </div>
    <div className="navs">
            <Link to='/all' className={"all "+opened}><ion-icon name="folder-outline"></ion-icon></Link>
            <Link to='/'className={"workout "+opened}><ion-icon name="barbell-outline"></ion-icon></Link>
            <Link to='/plan' className={"plan "+opened}><ion-icon name="calendar-outline"></ion-icon></Link>
    </div>
  </>
  )
}
