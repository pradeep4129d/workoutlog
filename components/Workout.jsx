import React, { useEffect, useState } from 'react'
import { getData } from '../src/indexedBD'
import Cards from './Cards'
import { useStore } from '../src/store'
import { StartExercise } from './StartExercise'
import { json } from 'react-router-dom'

export const Workout = () => {
  const [workout,setWorkout]=useState([])
  const [data,setData]=useState([])
  const {showCard}=useStore()
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
      const info=[]
      for(let i=0;i<Workout.length;i++){
        info.push({name:Workout[i],completed:false,resume:false,resumedIndex:0})
      }
      const result1 = await getData('info');
        if(result1===null){
          await addData({ id:'info', data });
        }
      }
      if(!sessionStorage.getItem('info')){
        sessionStorage.setItem('info',JSON.stringify(info))
      }
      sessionStorage.setItem('curmuscle',null)
    }
    getday()

  },[])
  return (
    <div className='routine'>
        {showCard && <div className="routine-box"><p>Today's Routine</p><Cards data={workout}/></div>}
        {!showCard && <StartExercise/>}
    </div>
  )
}
