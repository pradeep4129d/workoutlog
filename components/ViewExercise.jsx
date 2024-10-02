import React, { useEffect, useRef, useState } from 'react'
import { getData, updateData } from '../src/indexedBD'
import { useNavigate } from 'react-router-dom'

export const ViewExercise = (props) => {
    const [record,setRecord]=useState(props.data)
    const [field,setfield]=useState(false)
    const [name,setName]=useState('')
    const [index,setIndex]=useState(0)
    const [warning,setWarning]=useState('')
    const [edit,setEdit]=useState(false)
    const navigate=useNavigate()
    const [refresh,setRefresh]=useState(false)
    useEffect(()=>{
        const editor=document.getElementsByClassName('editor')[index]
        if(editor){
            editor.style.display='none'
        }
        const getdata=async()=>{
            const result=await getData(record.id)
            setRecord(result)
        }
        getdata()
        console.log('refreshed')
    },[field,refresh])
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
                                <div className="editor" tabIndex={0} autoFocus onBlur={()=>{
                                    const editor=document.getElementsByClassName('editor')[index]
                                    if (editor) {
                                            editor.style.display = 'none';
                                        } 
                                }} key={index} id={'l'+index}>
                                    <div className="editbtn">
                                        <input type="text" autoFocus placeholder='Rename..' onBlur={(e)=>{
                                        const rename=e.target.value
                                        if(rename!==''){
                                            const updatedata=record
                                            updatedata.data.exercises[index].name=rename
                                            updateData(updatedata)
                                            .then(() => console.log("Record updated successfully"))
                                            .catch(error => console.error("Failed to update record: ", error));
                                            setRefresh(refresh?false:true)
                                        }}}/><ion-icon name="create"></ion-icon></div> <hr />
                                    <div className="delete" onClick={()=>{
                                        const updatedata=record
                                        updatedata.data.exercises.splice(index,1)
                                        updateData(updatedata)
                                        .then(() => console.log("Record updated successfully"))
                                        .catch(error => console.error("Failed to update record: ", error));
                                        setRefresh(refresh?false:true)
                                    }}><span>Delete</span><ion-icon name="trash"></ion-icon></div>
                                </div>
                                <ion-icon name="barbell-sharp"></ion-icon><pre> </pre>
                                <p>{exercise.name}</p> 
                                <div onClick={()=>{
                                    setIndex(index)
                                    const editor=document.getElementsByClassName('editor')[index]
                                    if (editor) {
                                        if (editor.style.display === 'none' || editor.style.display === '') {
                                          editor.style.display = 'block'; // Show editor
                                        } else {
                                          editor.style.display = 'none'; // Hide editor
                                        }
                                    } else {
                                        console.error(`Element with id 'l${index}' not found`);
                                    }
                                }} className="edit"><ion-icon name="ellipsis-vertical"></ion-icon></div>
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
