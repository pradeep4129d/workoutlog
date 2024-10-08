import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../src/store'

export const Navbar = () => {
    const [opened,setOpened]=useState(false)
    const {setShowCard}=useStore()
  return (
    <>
    <div className="background" onClick={()=>{setOpened(opened?false:true)}}>
            <button className={"menu__icon "+opened}>
                <span></span>
                <span></span>
                <span></span>
            </button>
    </div>
    <div className="navs">
            <Link to='/all'  onClick={()=>{setShowCard(true)
              setOpened(opened?false:true)}} className={"all "+opened}><ion-icon name="folder-outline"></ion-icon></Link>
            <Link to='/' onClick={()=>{setOpened(opened?false:true)}}className={"workout "+opened}><ion-icon name="barbell-outline"></ion-icon></Link>
            <Link to='/plan'  onClick={()=>{setShowCard(true)
              setOpened(opened?false:true)}} className={"plan "+opened}><ion-icon name="calendar-outline"></ion-icon></Link>
    </div>
  </>
  )
}
