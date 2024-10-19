import React, { useEffect, useState } from 'react'
import { getData } from '../src/indexedBD'

export const Plan = () => {
  const [plan,setPlan]=useState([])
  useEffect(()=>{
    const getPlan=async()=>{
      const result=await getData('routine')
      if(result){
        setPlan(result.data.day)
      }
    }
    getPlan()
  })
  return (
    <div className='plan-tab'>
      <p>Current Plan</p>
      <div className="days">
        {plan.map((day,index)=>{
          return <div className="day-container">
            <div className="day">
              <p>day -{index+1}</p>
            </div>
            {day.map((muscle,index)=>{
              return <div className="e">
                <p>{muscle}</p>
                <div className="remove">
                <ion-icon name="close-outline"></ion-icon>
                </div>
              </div>
            })}
            <div className="add-muscle"><div className="add-btn">add</div></div>
          </div>
        })}
         <div className="e add">
                <ion-icon name="add-outline"></ion-icon>
                <p>add day</p>
            </div>
        <p></p>
      </div>
    </div>
  )
}
