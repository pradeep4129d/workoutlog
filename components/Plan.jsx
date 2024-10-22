import React, { useEffect, useState } from 'react'
import { getData, updateData } from '../src/indexedBD'
import { ShowList } from './ShowList'

export const Plan = () => {
  const [plan,setPlan]=useState([])
  const [refresh,setRefresh]=useState(false)
  const [showList,setShowList]=useState(false)
  const [index,setIndex]=useState(0)
  const [date,setDate]=useState()
  useEffect(()=>{
    setShowList(false)
    const getPlan=async()=>{
      const result=await getData('routine')
      if(result){
        setPlan(result.data.day)
        
        setDate(new Date(result.data.startDate).toDateString() )
      }
    }
    getPlan()
  },[refresh])
  const refreshParent = () => {
    setRefresh(refresh?false:true); 
  };
  return (
    <>
    {showList&& <ShowList refreshParent={refreshParent} index={index}/>}
    <div className='plan-tab'>
      <p>Current Plan</p>
      <p>Start Date: {date}</p>
      <input style={{background:'transparent',border:'none',color:'white',fontSize:'16px',marginBottom:'15px'}} required type="date" name="" id="" autoFocus />
      <div className='add-btn'>change</div>
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
                      if(res.data.day[index1].length===0){
                        res.data.day.splice(index1,1)
                      }
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
         <div className="e add" onClick={()=>{
          setPlan([...plan,[]])
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
