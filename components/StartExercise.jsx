import React, { useEffect, useState } from 'react'
import { getData, updateData } from '../src/indexedBD'

export const StartExercise = () => {
    const [Info,setInfo]=useState([])
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
            const result = await getData(Info[curMuscle].name)
            const res=await getData('draft')
            if(res!==null){
                if(res.data!==null){
            const draft=res.data.map((data,index)=>{
                if(data.name===Info[curMuscle].name){
                    return data
                }
            })
            console.log(draft[0])
            if(draft[0].checked){
                setChecked(true)
                console.log((draft[0].working.reps*draft[0].working.weight))
                setCurLoad((draft[0].working.reps*draft[0].working.weight))
            }
            if(draft[0].dropcheck){
                setDropCheck(true)
            }}
        }
            if(result){
                setRecord(result)
                setImg(result.data.imgurl)
                setExercises(result.data.exercises)
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
                        setDropSets({reps:0})
                        setDropCheck(true)
                    }else{
                        setDropCheck(false)        
                    setDropSets({weight:Number(result.data.exercises[curexercise].sets[setIndex].working.weight)-Number(result.data.exercises[curexercise].weightIncrement),reps:result.data.exercises[curexercise].targetReps-Number(result.data.exercises[curexercise].sets[setIndex].working.reps)-1})
                    }
                }
            }
        }
        if(Info.length){getdata()}
    },[Info])
    console.log(dropCheck,checked)
return (
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
        {exercises.length &&<><div className="e-name">
                {exercises[curexercise].name}
                <ion-icon name="chevron-back-outline"></ion-icon>
            </div><hr />
            <div className="set-container">
                <p>set-{curexercise+1}</p>
                <p className='ws'>Working set</p>
                <div className="e r">
                    <div className="rep">{!checked?<><input type='number' value={attrs.reps} onChange={(e)=>{
                        setDropSets(false)
                        if(e.target.value<exercises[curexercise].targetReps && e.target.value>0){
                            setDropSets({weight:Number(exercises[curexercise].sets[setIndex].working.weight),reps:(exercises[curexercise].targetReps-e.target.value)})
                            if((record.data.exercises[curexercise].targetReps===Number(record.data.exercises[curexercise].sets[setIndex].working.reps))){
                                
                                setDropSets({weight:Number(exercises[curexercise].sets[setIndex].working.weight),reps:(exercises[curexercise].targetReps-e.target.value)})
                            }
                            else{
                                setFailedReps(workingReps-e.target.value)
                                setDropSets({weight:Number(exercises[curexercise].sets[setIndex].working.weight)-Number(record.data.exercises[curexercise].weightIncrement),reps:(exercises[curexercise].targetReps-e.target.value+failedReps)})
                            }
                        }
                        if(e.target.value>=exercises[curexercise].targetReps){
                            setDropSets(null)
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
                                        res.data.push({name:Info[curMuscle].name,setIndex:setIndex,checked:true,dropcheck:false,working:{reps:attrs.reps,weight:attrs.weight},dropset:{reps:0,weight:0}})
                                    }
                                    else{
                                        const data=[{name:Info[curMuscle].name,setIndex:setIndex,checked:true,dropcheck:false,working:{reps:attrs.reps,weight:attrs.weight},dropset:{reps:0,weight:0}}]
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
                                    <input id="cbx-12" type="checkbox" disabled={dropCheck} onChange={()=>{
                                        setDropCheck(true)
                                        setCurLoad(curLoad+(dropsets.weight*dropsets.reps))
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
                    <button class="button">
                    <span class="text">Next</span>
                    <svg class="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
                    </button>
            }
        </div>
    </div>
)
}
