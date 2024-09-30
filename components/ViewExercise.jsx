import React, { useEffect, useRef, useState } from 'react'
import { getData, updateData } from '../src/indexedBD'
import { useNavigate } from 'react-router-dom'

export const ViewExercise = (props) => {
    const [record,setRecord]=useState(props.data)
    const [field,setfield]=useState(false)
    const [name,setName]=useState('')
    const [warning,setWarning]=useState('')
    const navigate=useNavigate()
    useEffect(()=>{
        const getdata=async()=>{
            const result=await getData(record.id)
            setRecord(result)
        }
        getdata()
      console.log('refreshed')
    },[field])
  return (
    <>
    <div className='view'>
        <div className="heading">
            <ion-icon name="chevron-back-outline" onClick={()=>{navigate('/all')}}></ion-icon>
            <img src={props.data.data.imgurl} alt="" />
            <h3>{props.data.id}</h3>
        </div>
        <h3>Exercises</h3>
        {record &&<div className="exercises">
            {
               record.data.exercises.length && <>{
                record.data.exercises.map((exercise,index)=>{
                        return  <>
                            <div className="e" key={index}>
                            <ion-icon name="barbell-sharp"></ion-icon><pre> </pre>
                               <p>{exercise.name}</p> 
                               <div className="edit"><ion-icon name="ellipsis-vertical"></ion-icon></div>
                            </div>
                                </>})}</>
            }
            {field&& <div className={'e '+warning} >
                <ion-icon name="barbell-sharp"></ion-icon>
                <input type="text" name="" id="" placeholder='name...' autoFocus onChange={(e)=>{setName(e.target.value)}} onBlur={()=>{
            if(field){
                if(name===''){  
                    setWarning('t')
                    setName('')
                }
                else{
                    setWarning('')
                    record.data.exercises.push({name:name,sets:[],weightIncrement:2.5})
                    setName('')
                    updateData(record)
                    .then(() => console.log("Record updated successfully"))
                    .catch(error => console.error("Failed to update record: ", error));
                    setfield(false)
                }
            }
            }}/>
            </div>
            }
            <div className="e" onClick={()=>{
                setfield(true)
            }}>
                <ion-icon name="add-outline"></ion-icon>
                <p>add Exericse</p>
            </div>
        </div>}
    </div>
    </>
  )
}
