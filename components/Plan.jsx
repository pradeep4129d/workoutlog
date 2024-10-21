import React, { useEffect, useState } from 'react'
import { getData, updateData } from '../src/indexedBD'
import { ShowList } from './ShowList'

export const Plan = () => {
  const [plan,setPlan]=useState([])
  const [refresh,setRefresh]=useState(false)
  const [showList,setShowList]=useState(false)
  const [index,setIndex]=useState(0)
  useEffect(()=>{
    setShowList(false)
    const getPlan=async()=>{
      const result=await getData('routine')
      if(result){
        setPlan(result.data.day)
      }
    }
    getPlan()
  },[refresh])
  console.log(plan)
  const refreshParent = () => {
    setRefresh(refresh?false:true); 
  };
  return (
    <>
    {showList&& <ShowList refreshParent={refreshParent} index={index}/>}
    <div className='plan-tab'>
      <p>Current Plan</p>
      <div className="days">
        {plan.map((day,index1)=>{
          return <div className="day-container">
            <div className="day">
              <p>day -{index1+1}</p>
            </div>
            {day.map((muscle,index2)=>{
              return <div className="e">
                <p>{muscle}</p>
                <div className="remove" onClick={async()=>{
                    const res=await getData('routine')
                    if(res){
                      res.data.day[index1].splice(index2,1)
                      console.log(res)
                      await updateData(res)
                      setRefresh(refresh?false:true)
                    }
                }}>
                <ion-icon name="close-outline"></ion-icon>
                </div>
              </div>
            })}
            <div className="add-muscle"><div className="add-btn" onClick={()=>{
              setIndex(index1)
              setShowList(true)
            }}>add</div></div>
          </div>
        })}
         <div className="e add" onClick={async()=>{
          const res=await getData('routine')
          if(res){
            res.data.day.push([])
            await updateData(res)
          }
          setRefresh(refresh?false:true)
         }}>
                <ion-icon name="add-outline"></ion-icon>
                <p>add day</p>
            </div>
        <p></p>
      </div>
    </div>
    </>
  )
}
