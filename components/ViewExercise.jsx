import React, { useEffect, useRef, useState } from 'react'
import { getData, updateData } from '../src/indexedBD'
import { useNavigate } from 'react-router-dom'

export const ViewExercise = (props) => {
    const [record,setRecord]=useState(props.data)
    const [field,setfield]=useState(false)
    const [name,setName]=useState('')
    const [index,setIndex]=useState(0)
    const [index2,setIndex2]=useState(0)
    const [warning,setWarning]=useState('')
    const [coordinates,setCoordinates]=useState(0)
    const navigate=useNavigate()
    const [enable,setEnable] = useState(false)
    const [refresh,setRefresh]=useState(false)
    const [set,setSet]=useState(false);
    useEffect(()=>{
        const getdata=async()=>{
            const result=await getData(record.id)
            setRecord(result)
        }
        getdata()
        console.log('refreshed')
    },[field,refresh])
    return (
    <>
    {enable && <div className="editor" style={{top:coordinates+5}} tabIndex={0} onBlur={()=>{
        const editor=document.getElementsByClassName('editor')[index]
        if (editor) {
                editor.style.display = 'none';
            } 
            setEnable(false)
        }}>
        {!set &&<><div className="editbtn">
            <input type="text"  placeholder='Rename..' onBlur={(e)=>{
            const rename=e.target.value
            if(rename!==''){
                const updatedata=record
                updatedata.data.exercises[index].name=rename
                updateData(updatedata)
                .then(() => console.log("Record updated successfully"))
                .catch(error => console.error("Failed to update record: ", error));
                setEnable(false)
                setRefresh(refresh?false:true)
            }}}/><ion-icon name="create"></ion-icon></div><hr /></>} 
        <div className="delete" onClick={()=>{
            const updatedata=record
            if(set){
                updatedata.data.exercises[index].sets.splice(index2,1)
            }else{
                updatedata.data.exercises.splice(index2,1)
            }
            updateData(updatedata)
            .then(() => console.log("Record updated successfully"))
            .catch(error => console.error("Failed to update record: ", error));
            setEnable(false)
            setRefresh(refresh?false:true)
        }}><span>Delete</span><ion-icon name="trash"></ion-icon></div>
    </div>}
    <div className='view'>
        <div className="heading">
            <ion-icon name="chevron-back-outline" onClick={()=>{(set)?setSet(false):navigate('/all')}}></ion-icon>
            <img src={props.data.data.imgurl} alt="" />
            <h3>{props.data.id}</h3>
        </div>
        <h3>{set?<>{record.data.exercises[index].name}</>:<>Exercises</>}</h3>
        {set && <div className='showset'>
            {record.data.exercises[index] &&<>
            <div className="set-container">
                {record.data.exercises[index].sets.map((set,index)=>{
                    return <>
                    <div className="e" key={index}>
                    <ion-icon name="stopwatch"></ion-icon><pre> </pre>
                        set-{index+1}
                        <div onClick={(e)=>{
                                    setIndex2(index)
                                    setEnable(enable?false:true)
                                    setCoordinates(e.clientY)
                        }} className="edit"><ion-icon name="ellipsis-vertical"></ion-icon></div>
                    </div>
                    </>
                })}
                <div className="e" onClick={()=>{
                record.data.exercises[index].sets.push({working:{weight:0,reps:0},dropset:[{weight:0,reps:0}]})
                updateData(record)
                .then(() => console.log("Record updated successfully"))
                .catch(error => console.error("Failed to update record: ", error));
                setRefresh(refresh?false:true)
                }}>
                <ion-icon name="add-outline"></ion-icon>
                <p>add set</p>
            </div>
            </div></>}
        </div>}
        {record && !set && <div className="exercises">
            {
                record.data.exercises.length && <>{
                record.data.exercises.map((exercise,index)=>{
                        return  <>
                            <div className="e" key={index} >
                                <ion-icon name="barbell-sharp"></ion-icon><pre> </pre>
                                <p onClick={()=>{
                                setSet(set?false:true)
                                setIndex(index)}}>{exercise.name}</p> 
                                <div onClick={(e)=>{
                                    setEnable(enable?false:true)
                                    setIndex(index)
                                    setCoordinates(e.clientY)
                                }} className="edit"><ion-icon name="ellipsis-vertical"></ion-icon></div>
                            </div>
                                </>})}</>
            }
            {field&& <div className={'e '+warning} >
                <ion-icon name="barbell-sharp"></ion-icon>
                <input type="text" name="" id="" placeholder='name...' autoFocus onFocus={()=>{setEnable(false)}} onChange={(e)=>{setName(e.target.value)}} onBlur={()=>{
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
