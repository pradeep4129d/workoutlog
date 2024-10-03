import React, { useEffect, useState } from 'react'
import { updateData } from '../src/indexedBD'

export const AddViewDrop = (props) => {
    const [field,setField]=useState(false)
    const [att,setAtt]=useState({weight:0,reps:0})
    const [index1,index2]=props.data.index
    const [coordinates,setCoordinates]=useState(0)
    const [enable,setEnable]=useState(false)
    const [index3,setIndex3]=useState(0)
    console.log(index1)
    const [refresh,setRefresh]=useState(false)
    useEffect(()=>{
        const handleGetData = async () => {
            const id=sessionStorage.getItem('muscle')
            const result = await getData(id);
            console.log(result)
            props.data.data=result.data
        };
        handleGetData
    },[refresh])
return (
    <>
     <div className="tload">Total {props.data.data.exercises[index1].load} Kg</div>
    {enable && <div className="editor" style={{top:coordinates+5}} tabIndex={0}>
       <div className="delete" onClick={()=>{
            const updatedata=props.data.data
            updatedata.exercises[index1].load=updatedata.exercises[index1].load-(updatedata.exercises[index1].sets[index2].dropset[index3].weight*updatedata.exercises[index1].sets[index2].dropset[index3].reps)
            updatedata.exercises[index1].sets[index2].dropset.splice(index3,1)
            updateData(updatedata)
            .then(() => console.log("Record updated successfully"))
            .catch(error => console.error("Failed to update record: ", error));
            setEnable(false)
            setRefresh(refresh?false:true)
        }}><span>Delete</span><ion-icon name="trash"></ion-icon></div>
    </div>}
        {props.data.data.exercises[index1].sets[index2].dropset.length>0 && props.data.data.exercises[index1].sets[index2].dropset.map((drop,index)=>{
            return <>
                <div className="e" >
                        <div className='rep'>{drop.reps} reps</div>
                        <div className='weight'>{drop.weight} Kg</div>
                        <div className='load'>{drop.reps*drop.weight}kg Load</div>
                        <div onClick={(e)=>{
                                    setIndex3(index)
                                    setEnable(enable?false:true)
                                    setCoordinates(e.clientY)
                        }} className="edit"><ion-icon name="ellipsis-vertical"></ion-icon></div>
                </div>
                    </>
        })}
        {field&& <div className={'e'} >
            <div className='rep'>
                <input type="number" name="" id="" autoFocus onChange={(e)=>{setAtt({...att,reps:e.target.value})}} onblur={()=>{
                                const wt=document.getElementById('ds')
                                if(wt){
                                    wt.focus()
                                }
                }}/> reps</div>
            <div className='weight'>
                <input type="number" name="" id="ds" onChange={(e)=>{setAtt({...att,weight:e.target.value})}} onBlur={()=>{
                                props.data.data.exercises[index1].sets[index2].dropset.push(att)
                                setAtt({weight:0,reps:0})
                                props.data.data.exercises[index1].load=props.data.data.exercises[index1].load+att.weight*att.reps
                                updateData({id:props.data.id,data:props.data.data   })
                                .then(() => console.log("Record updated successfully"))
                                .catch(error => console.error("Failed to update record: ", error));
                                setRefresh(refresh?false:true)
                                setField(false)
                            }
                        } /> Kg
                </div>
                <div className='load'>{att.weight*att.reps} kg Load</div>
            </div>
        }
        <div className="e a" onClick={()=>{setField(true)}}>
                <ion-icon name="add-outline"></ion-icon><pre> </pre>
                <p>add Drop set</p>
        </div>
    </>
)
}
