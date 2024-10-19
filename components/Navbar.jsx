import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../src/store'
import { getData } from '../src/indexedBD'

export const Navbar = () => {
    const [opened,setOpened]=useState(false)
    const {setShowCard}=useState()
    const [Info,setInfo]=useState()
    const [index,setIndex]=useState()
    useEffect(()=>{
      const getdata=async()=>{
        const info=await getData('info')
        const curmuscle=await getData('curmuscle')
        if(info){
          setIndex(curmuscle.data)
          setInfo(info.data)
        }
      }
      getdata()
    })
    const handleresume=async() =>{
      Info[index].resume=true
      updateData({id:'info',data:Info})
      .then(() => console.log("Record updated successfully"))
      .catch(error => console.error("Failed to update record: ", error));
    }
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
            <Link to='/all'  onClick={()=>{
              handleresume()
              setOpened(opened?false:true)}} className={"all "+opened}><ion-icon name="folder-outline"></ion-icon></Link>
            <Link to='/' onClick={()=>{setOpened(opened?false:true)}}className={"workout "+opened}><ion-icon name="barbell-outline"></ion-icon></Link>
            <Link to='/plan'  onClick={()=>{
              handleresume()
              setOpened(opened?false:true)}} className={"plan "+opened}><ion-icon name="calendar-outline"></ion-icon></Link>
    </div>
  </>
  )
}
