import React, { useEffect, useState } from 'react'
import { getData,addData, updateData } from '../src/indexedBD'
import Cards from './Cards'
import { useStore } from '../src/store'
import { StartExercise } from './StartExercise'
import { json } from 'react-router-dom'

export const Workout = () => {
  const [workout,setWorkout]=useState([])
  const [data,setData]=useState([])
  const [refresh,setRefresh]=useState(0)
  const {showCard,setShowCard}=useStore()
  const [postpone,setPostpone]=useState(false)
  const refreshParent = () => {
    setRefresh(prevKey => prevKey + 1); 
  };
  useEffect(()=>{
    const post=JSON.parse(localStorage.getItem('post'))
    if(post){
      console.log(post)
      if(new Date(post.date).toDateString()===new Date().toDateString()){
        setPostpone(true)
      }
      else{
        localStorage.removeItem('post')
      }
    }
  },[])
  useEffect(()=>{
    const getdata=async()=>{
      const info=await getData('info')
      const curmuscle=await getData('curmuscle')
      if(info){
        console.log(info,curmuscle)
        if(info.data[curmuscle.data].resume){
          console.log(info.data[curmuscle.data].resume)
          setShowCard(false)
        }
      }
    }
    getdata()
  })
  useEffect(()=>{
    const getday=async()=>{
      const result=await getData('routine')
      const startdate=result.data.startDate
      const currdate=new Date(Date.now())
      const date=await getData('curdate')
      if(date===null){
        await addData({id:'curdate',data:currdate})
      }
      let timeDifference = currdate.getTime()-startdate.getTime()
      let daysDifference =Math.trunc(timeDifference / (1000 * 60 * 60 * 24))
      const Workout = result.data.day[ daysDifference % result.data.day.length]
      console.log(Workout)
      setWorkout(Workout)
      const info=[]
      for(let i=0;i<Workout.length;i++){
        info.push({name:Workout[i],completed:false,resume:false,resumedExIndex:0,resumedSetIndex:0})
      }
      const res=await getData('draft')
      if(res===null){
        await addData({id:'draft',data:null})
      }
      const result1 = await getData('info');
        if(result1===null){
          await addData({ id:'info', data:info});
        }
        else{
          const curdate=await getData('curdate')
          if(new Date(curdate.data).toDateString() !== new Date().toDateString()){
            curdate.data=Date.now()
          await updateData(curdate)
          await updateData({id:'info',data:info})
          }
        }
      const result2=await getData('curmuscle')
      if(result2===null){
        await addData({ id:'curmuscle', data:0});
      }
    }
    getday()
  },[showCard])
  return (<>
    {!postpone?
    <div className='routine' key={refresh}>
        {showCard && <div className="routine-box">
          <p>Today's Routine</p><Cards data={workout}/>
          <div className="glass">
            <button className="post" onClick={async()=>{
              localStorage.setItem('post',JSON.stringify({date:new Date(Date.now())}))
              setPostpone(true);
              const result=await getData('routine')
              if(result!==null){
                result.data.startDate = new Date(result.data.startDate); 
                result.data.startDate.setDate(result.data.startDate.getDate() + 1); 
              }
              await updateData(result)
            }}>Postpone</button>
          </div>
        </div>}
        {!showCard && <StartExercise refreshParent={refreshParent}/>}
    </div>:<div className='message'>No Workout today</div> }</>
  )
}
