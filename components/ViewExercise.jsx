import React, { useEffect, useRef, useState } from 'react'
import { getData, updateData } from '../src/indexedBD'
import { useNavigate } from 'react-router-dom'
import { AddViewDrop } from './AddViewDrop'

export const ViewExercise = (props) => {
    const [record,setRecord]=useState(props.data)
    const [field,setfield]=useState(false)
    const [name,setName]=useState('')
    const [index,setIndex]=useState(0)
    const [index2,setIndex2]=useState(0)
    const [index3,setIndex3]=useState(0)
    const [warning,setWarning]=useState('')
    const [incre,setIncre]=useState(false)
    const [rep,setRep]=useState(false)
    const [coordinates,setCoordinates]=useState(0)
    const [prop,setProp]=useState({weight:0,reps:0})
    const navigate=useNavigate()
    const [edit,setEdit]=useState(false)
    const [enable,setEnable] = useState(false)
    const [refresh,setRefresh]=useState(false)
    const [set,setSet]=useState(false);
    const [showset,setShowset]=useState(false)
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
    {enable && <div className="editor" style={{top:coordinates+5}} autoFocus={showset} tabIndex={0} onBlur={()=>{
        const editor=document.getElementsByClassName('editor')[index]
        if (editor) {
                editor.style.display = 'none';
            } 
            setEnable(false)
        }}>
        { (showset || !set) &&<><div className="editbtn" onClick={()=>{
            if(showset){
                setEdit(true)
            }
        }}>
            {showset?<>Edit</>:<input type="text"  placeholder='Rename..' onBlur={(e)=>{
            const rename=e.target.value
            if(rename!==''){
                const updatedata=record
                updatedata.data.exercises[index].name=rename
                updateData(updatedata)
                .then(() => console.log("Record updated successfully"))
                .catch(error => console.error("Failed to update record: ", error));
                setEnable(false)
                setRefresh(refresh?false:true)
            }}}/>}<ion-icon name="create"></ion-icon></div></>} 
            {!showset && !set && <hr/>}
        {!showset && <div className="delete" onClick={()=>{
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
        }}><span>Delete</span><ion-icon name="trash"></ion-icon></div>}
    </div>}
    <div className='view'>
        <div className="heading">
            <ion-icon name="chevron-back-outline" onClick={()=>{
                (showset?setShowset(false):(set)?setSet(false):navigate('/all'))}}></ion-icon>
            <img src={props.data.data.imgurl} alt="" />
            <h3>{props.data.id}</h3>
        </div>
        <h3>{showset?<>Set-{index2+1}</>:set?<>{record.data.exercises[index].name}</>:<>Exercises</>}</h3>

        {
            showset && <>
                <div className="show">
                <hr />
                    <p>Working Set</p>
                    <div className="e" >
                        <div className='rep'>{edit?<><input type="number" name="" id="" autoFocus onBlur={(e)=>{
                            const reps=e.target.value
                            if(reps){
                                record.data.exercises[index].sets[index2].working.reps=reps
                                updateData(record)
                                .then(() => console.log("Record updated successfully"))
                                .catch(error => console.error("Failed to update record: ", error));}
                                const wt=document.getElementById('wt')
                                if(wt){
                                    wt.focus()
                                }
                            }}/></>:record.data.exercises[index].sets[index2].working.reps} reps</div>
                        <div className='weight'>{edit?<><input type="number" name="" id="wt" onBlur={(e)=>{
                            const weight=e.target.value
                            if(weight){
                                record.data.exercises[index].sets[index2].working.weight=weight
                                record.data.exercises[index].sets[index2].load=record.data.exercises[index].sets[index2].working.weight*record.data.exercises[index].sets[index2].working.reps
                                updateData(record)
                                .then(() => console.log("Record updated successfully"))
                                .catch(error => console.error("Failed to update record: ", error));
                            }
                            setRefresh(refresh?false:true)
                                setEdit(false)
                        }} /></>:record.data.exercises[index].sets[index2].working.weight} Kg</div>
                        <div className='load'>{record.data.exercises[index].sets[index2].working.reps*record.data.exercises[index].sets[index2].working.weight}kg Load</div>
                        <div onClick={(e)=>{
                                    setEnable(enable?false:true)
                                    setIndex(index)
                                    setCoordinates(e.clientY)
                                }} className="edit"><ion-icon name="ellipsis-vertical"></ion-icon></div>
                    </div>
                    <p>Drop sets</p>
                    <AddViewDrop data={{data:record.data,index:[index,index2],id:record.id}}/>
                </div>
            </>
        }
        {set && !showset && <div className='showset'>
            {record.data.exercises[index] &&<>
            <div className="e-info" onClick={()=>{
                setIncre(true)
            }}>
                + {incre?<><input type="number" name="" id="" autoFocus onBlur={(e)=>{
                        const i=e.target.value
                        if(i){
                            record.data.exercises[index].weightIncrement=i
                                updateData(record)
                                .then(() => console.log("Record updated successfully"))
                                .catch(error => console.error("Failed to update record: ", error));
                                setIncre(false)
                                setRefresh(refresh?false:true)
                        }
                }}/></>:record.data.exercises[index].weightIncrement} Kg
            </div>
            <div className="t-rep" onClick={()=>{
                setRep(true)
            }}>
                {rep?<><input type='number' name="" id="" autoFocus onBlur={(e)=>{
                        const i=e.target.value
                        if(i){
                            record.data.exercises[index].targetReps=i
                                updateData(record)
                                .then(() => console.log("Record updated successfully"))
                                .catch(error => console.error("Failed to update record: ", error));
                                setRep(false)
                                setRefresh(refresh?false:true)
                        }
                }}/></>:record.data.exercises[index].targetReps} reps
            </div>
            <div className="set-container">
                {record.data.exercises[index].sets.map((set,index)=>{
                    return <>
                    <div className="e" key={index}>
                    <ion-icon name="stopwatch"></ion-icon><pre> </pre>
                        <div onClick={()=>{setShowset(true)
                            setIndex2(index)
                        }}>set-{index+1}</div>
                        <div onClick={(e)=>{
                                    setIndex2(index)
                                    setEnable(enable?false:true)
                                    setCoordinates(e.clientY)
                        }} className="edit"><ion-icon name="ellipsis-vertical"></ion-icon></div>
                    </div>
                    </>
                })}
                <div className="e" onClick={()=>{
                record.data.exercises[index].sets.push({working:{weight:0,reps:0},dropset:[],load:0})
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
                                setSet(true)
                                setIndex(index)
                                }}>{exercise.name}</p> 
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
                    record.data.exercises.push({name:name,sets:[],weightIncrement:2.5,targetReps:12})
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
