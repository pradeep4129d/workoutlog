import React, { useEffect, useState } from 'react'
import { getData, updateData } from '../src/indexedBD'
import { useStore } from '../src/store'
import { useNavigate } from 'react-router-dom'

export const StartExercise = ({refreshParent}) => {
    const [Info,setInfo]=useState([])
    const {setShowCard}=useStore()
    const [exercises,setExercises]=useState([])
    const [dropCheck,setDropCheck]=useState(true)
    const [record,setRecord]=useState()
    const [workingReps,setWorkingReps]=useState()
    const [load,setLoad]=useState({prev:0,target:0})
    const [failedReps,setFailedReps]=useState(0)
    const [curMuscle,setCurMuscle]=useState(0)
    const [curLoad,setCurLoad]=useState(0)
    const [checked,setChecked]=useState(false)
    const [dropsets,setDropSets]=useState({reps:0})
    const [attrs,setAttrs]=useState({weight:0,reps:0})
    const [refresh,setRefresh]=useState(false)
    const [curexercise,setCurExercise]=useState(0)
    const [setIndex,setSetIndex]=useState(0)
    const [img,setImg]=useState('')
    const [handleindex,setHandleIndex]=useState(true)
    const navigate=useNavigate()
    useEffect(()=>{
        const handleIndex=async()=>{
            const info=await getData('info')
            const curmuscle=await getData('curmuscle')
            const result = await getData(info.data[curmuscle.data].name)
            if(info){
            if(info.data[curmuscle.data].resumedExIndex>result.data.exercises.length-1){
                info.data[curmuscle.data].resumedExIndex=0;
                info.data[curmuscle.data].completed=true;
                info.data[curmuscle.data].resume=false;
                updateData(info);
                setShowCard(true)
            }
            if(info.data[curmuscle.data].resumedSetIndex>result.data.exercises[info.data[curmuscle.data].resumedExIndex].sets.length-1){
                info.data[curmuscle.data].resumedSetIndex=0
                info.data[curmuscle.data].resumedExIndex+=1
                updateData(info)
            }}
            setRefresh(refresh?false:true)
        }
        handleIndex()
    },[handleindex])
    useEffect(()=>{
        const getInfos=async()=>{
            const result=await getData('info')
            if(result){
                setInfo(result.data)
            }
            const result2=await getData('curmuscle')
            if(result2){
                setCurMuscle(result2.data)
                if(Info.length){
                    setCurExercise(Info[result2.data].resumedExIndex)
                    setSetIndex(Info[result2.data].resumedSetIndex)
                }
            } 
        }
        getInfos()
    },[refresh])
    useEffect(()=>{
        const getdata=async()=>{
            const curmuscle=await getData('curmuscle')
            const result = await getData(Info[curmuscle.data].name)
            const setIndex=Info[curmuscle.data].resumedSetIndex
            const curexercise=Info[curmuscle.data].resumedExIndex
            console.log(setIndex,curexercise)
            setCurExercise(curexercise)
                setSetIndex(setIndex)
                if(curexercise>result.data.exercises.length-1){
                    refreshParent()
                }
            if(result && curexercise<=result.data.exercises.length-1){
                
                setRecord(result)
                setImg(result.data.imgurl)
                setExercises(result.data.exercises)
                setFailedReps(result.data.exercises[curexercise].sets[setIndex].failCount)
                console.log(failedReps)
                if(result.data.exercises[curexercise].targetReps===Number(result.data.exercises[curexercise].sets[setIndex].working.reps)){
                    var weight=0
                    var reps=0
                    const newWeight=Number(result.data.exercises[curexercise].sets[setIndex].working.weight)+Number(result.data.exercises[curexercise].weightIncrement)
                    const workingLoad=Number(result.data.exercises[curexercise].sets[setIndex].working.weight)*Number(result.data.exercises[curexercise].sets[setIndex].working.reps)
                    console.log(workingLoad)
                    while(weight<workingLoad/2){
                        weight+=newWeight
                        reps++
                    }
                    let i=reps
                    while(i!=result.data.exercises[curexercise].targetReps){
                        weight+=Number(result.data.exercises[curexercise].sets[setIndex].working.weight)
                        i++
                    }
                    setLoad({prev:Number(result.data.exercises[curexercise].sets[setIndex].load),target:weight})
                    setAttrs({weight:newWeight,reps:reps})
                    setWorkingReps(reps)
                    setDropSets({weight:Number(result.data.exercises[curexercise].sets[setIndex].working.weight),reps:result.data.exercises[curexercise].targetReps-reps})
                    setDropCheck(false)
                }
                else{
                    setLoad({prev:Number(result.data.exercises[curexercise].sets[setIndex].load),target:Number(result.data.exercises[curexercise].weightIncrement)+result.data.exercises[curexercise].sets[setIndex].load})
                    setAttrs({weight:Number(result.data.exercises[curexercise].sets[setIndex].working.weight),reps:Number(result.data.exercises[curexercise].sets[setIndex].working.reps)+1})
                    setWorkingReps(Number(result.data.exercises[curexercise].sets[setIndex].working.reps)+1)
                    if(Number(result.data.exercises[curexercise].sets[setIndex].working.reps)+1===result.data.exercises[curexercise].targetReps){
                        if(failedReps>0){
                            setDropSets({reps:failedReps,weight:Number(result.data.exercises[curexercise].sets[setIndex].working.weight)-Number(result.data.exercises[curexercise].weightIncrement)})
                        }
                        setDropSets({reps:0,weight:0})
                        setDropCheck(true)
                    }else{
                        setDropCheck(false)
                        setDropSets({weight:Number(result.data.exercises[curexercise].sets[setIndex].working.weight)-Number(result.data.exercises[curexercise].weightIncrement),reps:result.data.exercises[curexercise].targetReps-Number(result.data.exercises[curexercise].sets[setIndex].working.reps)-1+failedReps})
                    }
                }
            }
            const res=await getData('draft')
            console.log(res)
            if(res!==null){
                if(res.data!==null){
                    if(res.data.length){
                    res.data.map((data,index)=>{
                        if(data.name===Info[curmuscle.data].name){
                            var totalLoad=0
                            if(data.checked){
                                setChecked(true)
                                totalLoad+=data.working.reps*data.working.weight
                                setDropSets({reps:data.dropset.reps, weight:data.dropset.weight})
                                setAttrs({reps:data.working.reps, weight:data.working.weight})
                                setFailedReps(data.failedReps)
                            }
                            if(data.dropcheck){
                                setDropCheck(true)
                                totalLoad+=data.dropset.reps*data.dropset.weight
                                setCurLoad(totalLoad)
                            }else
                            setDropCheck(false)
                        }
                        })}
                }
            }
        }
        if(Info.length){getdata()}
    },[Info,refresh])
return (
    <>
    <div className='start-e'>
        <div class="card">
            <div data-status="inprogress" class="teams">
                <span class="team-info team-home">
                <span class="team-info-container">
                    <span class="team-name-info prev">{load.prev}kg</span>
                </span>
                </span>
                <span class="event-scoreboard">
                <span class="event-score-container">
                    <span class="current-time-container">
                        <img src={img} alt="" />
                    </span>
                    <span class="score-container">
                    <span class="score-away">{curLoad}kg</span>
                    </span>
                </span>
                </span>
                <span class="team-info team-away">
                <span class="team-info-container">
                    <span class="team-icon-container"></span>
                    <span class="team-name-info target">
                    {load.target}kg
                    </span>
                </span>
                </span>
            </div>
            <div className="back" onClick={async()=>{
                    const data=await getData('info')
                    if(data){
                        data.data[curMuscle].resume=false;
                        await updateData(data)
                        setShowCard(true)
                    }
                }} ><ion-icon name="chevron-back-outline"></ion-icon></div>
        {exercises.length &&<><div className="e-name">
                {exercises[curexercise].name}
            </div><hr />
            <div className="set-container">
                <p>set-{setIndex+1}</p>
                <p className='ws'>Working set</p>
                <div className="e r">
                    <div className="rep">{!checked?<><input type='number' value={attrs.reps} onChange={(e)=>{
                        if(e.target.value<record.data.exercises[curexercise].targetReps && e.target.value>0){
                            setDropCheck(false)
                            if((record.data.exercises[curexercise].targetReps===Number(record.data.exercises[curexercise].sets[setIndex].working.reps))){
                                setDropCheck(false)
                                setDropSets({weight:Number(record.data.exercises[curexercise].sets[setIndex].working.weight),reps:(record.data.exercises[curexercise].targetReps-e.target.value)})
                            }
                            else{
                                var failedreps=Number(record.data.exercises[curexercise].sets[setIndex].failCount)
                                if(e.target.value>=workingReps){
                                    const diff=e.target.value-workingReps
                                    if(diff>=failedreps){
                                        setFailedReps(0)
                                        failedreps=0
                                    }
                                    else{
                                        failedreps-=diff
                                        setFailedReps(failedreps)
                                    }
                                }else{
                                    failedreps=workingReps-e.target.value
                                    setFailedReps(failedreps)
                                }
                                setDropSets({weight:Number(record.data.exercises[curexercise].sets[setIndex].working.weight)-Number(record.data.exercises[curexercise].weightIncrement),reps:record.data.exercises[curexercise].targetReps-e.target.value+failedreps})
                            }
                        }
                        if(e.target.value>=record.data.exercises[curexercise].targetReps){
                            setDropCheck(true)
                            setFailedReps(0)
                            setDropSets({reps:0,weight:0})
                        }
                        setAttrs({...attrs,reps:e.target.value})
                    }}/>reps</> :<>{attrs.reps} reps</>}</div>
                    <div className="weight">{attrs.weight} kg</div>
                    <div className="load">{attrs.weight*attrs.reps}kg load</div>
                    <div class="checkbox-wrapper-12" >
                        <div class="cbx">
                            <input id="cbx-12" type="checkbox" disabled={checked} checked={checked} onChange={async()=>{setChecked(true)
                                setCurLoad(attrs.weight*attrs.reps)
                                const res=await getData('draft')
                                if(res!==null){
                                    if(res.data!=null){
                                        res.data.push({name:Info[curMuscle].name,setIndex:setIndex,checked:true,dropcheck:dropsets.reps?false:true,working:{reps:attrs.reps,weight:attrs.weight},dropset:{reps:dropsets.reps,weight:dropsets.weight},failedReps:failedReps})
                                    }
                                    else{
                                        const data=[{name:Info[curMuscle].name,setIndex:setIndex,checked:true,dropcheck:dropsets.reps?false:true,working:{reps:attrs.reps,weight:attrs.weight},dropset:{reps:dropsets.reps,weight:dropsets.weight},failedReps:failedReps}]
                                        res.data=data
                                    }
                                    await updateData(res)
                                }
                                
                            }}/>
                            <label for="cbx-12"></label>
                            <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                            <path d="M2 8.36364L6.23077 12L13 2"></path>
                            </svg>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                            <filter id="goo-12">
                                <feGaussianBlur
                                in="SourceGraphic"
                                stdDeviation="4"
                                result="blur"
                                ></feGaussianBlur>
                                <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                result="goo-12"
                                ></feColorMatrix>
                                <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                            </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
                <p className="ws">Drop sets</p>
                {dropsets.reps &&  <div className="e r">
                                <div className="rep">{dropsets.reps} reps
                                </div>
                                <div className="weight">{dropsets.weight} kg</div>
                                <div className="load">{dropsets.weight*dropsets.reps}kg load</div>
                                <div class="checkbox-wrapper-12" >
                                    <div class="cbx">
                                    <input id="cbx-12" type="checkbox" disabled={dropCheck} checked={dropCheck} onChange={async()=>{
                                        setDropCheck(true)
                                        setCurLoad(curLoad+(dropsets.weight*dropsets.reps))
                                        const res=await getData('draft')
                                        var index=null
                                        if(res!==null){
                                            console.log(res)
                                            res.data.map((draft,i)=>{
                                                console.log(record.id)
                                                if(draft.name===record.id){
                                                    index=i;
                                                }
                                            })
                                            if(index!==null){
                                                console.log(index)
                                                res.data[index].dropcheck=true
                                            }
                                        await updateData(res)
                                        }
                                    }}/>
                                        <label for="cbx-12"></label>
                                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                                        <path d="M2 8.36364L6.23077 12L13 2"></path>
                                        </svg>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                        <defs>
                                        <filter id="goo-12">
                                            <feGaussianBlur
                                            in="SourceGraphic"
                                            stdDeviation="4"
                                            result="blur"
                                            ></feGaussianBlur>
                                            <feColorMatrix
                                            in="blur"
                                            mode="matrix"
                                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                                            result="goo-12"
                                            ></feColorMatrix>
                                            <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                                        </filter>
                                        </defs>
                                    </svg>
                                </div>
                            </div>}
            </div>
            </>}
            {checked && dropCheck &&
            <div className="glass next">
                <button class="button" onClick={async()=>{
                    const draft=await getData('draft')
                    const info=await getData('info')
                    var index=0
                    draft.data.map((data,i)=>{
                        if(data.name===record.id){
                            index=i
                            record.data.exercises[curexercise].sets[setIndex].working.reps=data.working.reps                            
                            record.data.exercises[curexercise].sets[setIndex].working.weight=data.working.weight
                            record.data.exercises[curexercise].sets[setIndex].dropset=[{weight:data.dropset.weight,reps:data.dropset.reps}]
                            record.data.exercises[curexercise].sets[setIndex].failCount=failedReps
                            record.data.exercises[curexercise].sets[setIndex].load=curLoad
                        }
                    })
                    updateData(record)
                    draft.data.splice(index,1)
                    updateData(draft)
                    if(info.data[curMuscle].resumedExIndex<=record.data.exercises.length-1){
                        if(info.data[curMuscle].resumedSetIndex<=record.data.exercises[curexercise].sets.length-1){
                            info.data[curMuscle].resumedSetIndex+=1
                        }
                        else{
                            info.data[curMuscle].resumedSetIndex=0
                            info.data[curMuscle].resumedExIndex+=1
                        }
                    }else{
                        info.data[curMuscle].completed=true
                        info.data[curMuscle].resume=false
                        setShowCard(true)
                    }
                    updateData(info)
                    setChecked(false)
                    setCurLoad(0)
                    setRefresh(refresh?false:true)
                    setHandleIndex(handleindex?false:true)
                }}> 
                    Next Set
                </button>
            </div>
            }
        </div>
    </div>
    </>
)
}
