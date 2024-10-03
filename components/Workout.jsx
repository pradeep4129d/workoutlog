import React, { useEffect, useState } from 'react'
import { getData } from '../src/indexedBD'
import Cards from './Cards'

export const Workout = () => {
  const [workout,setWorkout]=useState([])
  useEffect(()=>{
    const getday=async()=>{
      const result=await getData('routine')
      const startdate=result.data.startDate
      const currdate=new Date(Date.now())
      let timeDifference = currdate.getTime()-startdate.getTime()
      let daysDifference =Math.trunc(timeDifference / (1000 * 60 * 60 * 24))
      const Workout = result.data.day[ daysDifference % result.data.day.length]
      console.log(Workout)
      setWorkout(Workout)
    }
    getday()
  },[])
  return (
    <div className='routine'>
        <p>Today's Routine</p>
        <div className="routine-box">
          <Cards data={workout}/>
        </div>
    </div>
  )
}
