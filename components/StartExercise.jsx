import React, { useEffect, useState } from 'react'
import { getData } from '../src/indexedBD'

export const StartExercise = () => {
    const [Info,setInfo]=useState([])
    const [exercises,setExercises]=useState([])
    const [load,setLoad]=useState({prev:0,target:0})
    const [curLoad,setCurLoad]=useState(0)
    const [attrs,setAttrs]=useState({weight:0,reps:0})
    const [dropAttr,setDropAttr]=useState([{weight:0,reps:0}])
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
                setCurExercise(result2.data)
            }
            if(Info.length){
                setSetIndex(Info[curexercise].resumedSetIndex)
            }
        }
        getInfos()
        
    },[refresh])
    useEffect(()=>{
        const getdata=async()=>{
            const result = await getData(Info[curexercise].name)
            if(result){
                console.log(result)
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
                }
                else{
                    setLoad({prev:Number(result.data.exercises[curexercise].sets[setIndex].load),target:Number(result.data.exercises[curexercise].weightIncrement)+result.data.exercises[curexercise].sets[setIndex].load})
                    setAttrs({weight:Number(result.data.exercises[curexercise].sets[setIndex].working.weight),reps:Number(result.data.exercises[curexercise].sets[setIndex].working.reps)+1})
                }
            }
        }
        if(Info.length){getdata()}
    },[Info])
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

            </div><hr />
            <div className="set-container">
                <p>set-{curexercise+1}</p>
                <p className='ws'>Working set</p>
                <div className="e r">
                    <div className="rep">{attrs.reps} reps</div>
                    <div className="weight">{attrs.weight} kg</div>
                    <div className="load">{attrs.weight*attrs.reps}kg load</div>
                </div>
                <p className="ws">Drop sets</p>
                <div className="e r"></div>
            </div>
            </>}
        
        </div>
    </div>
)
}
