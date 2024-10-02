import React, { useEffect, useState } from 'react'
import { updateData } from '../src/indexedBD'

export const AddViewDrop = (props) => {
    const [field,setField]=useState(false)
    const [att,setAtt]=useState({weight:0,reps:0})
    const [index1,index2]=props.data.index
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
        {props.data.data.exercises[index1].sets[index2].dropset.length>0 && props.data.data.exercises[index1].sets[index2].dropset.map((drop,index)=>{
            return <>
                <div className="e" >
                        <div className='rep'>{props.data.data.exercises[index1].sets[index2].dropset.reps} reps</div>
                        <div className='weight'>{props.data.data.exercises[index1].sets[index2].dropset.weight} Kg</div>
                        <div className='load'>{props.data.data.exercises[index1].sets[index2].dropset.reps*props.data.data.exercises[index1].sets[index2].dropset.weight} kg Load</div>
                </div>
                    </>
        })}
        {field&& <div className={'e'} >
            <div className='rep'>
                <input type="number" name="" id="" autoFocus onChange={(e)=>{setAtt({...att,reps:e.target.value})}} onblur={()=>{
                                const wt=document.getElementById('wt')
                                if(wt){
                                    wt.focus()
                                }
                }}/> reps</div>
            <div className='weight'>
                <input type="number" name="" id="wt" onChange={(e)=>{setAtt({...att,reps:e.target.value})}} onBlur={()=>{
                                props.data.data.exercises[index1].sets[index2].dropset.push(att)
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
