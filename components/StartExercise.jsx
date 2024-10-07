import React, { useEffect, useState } from 'react'
import { getData } from '../src/indexedBD'

export const StartExercise = () => {
    const [Info,setInfo]=useState([])
    const [exercises,setExercises]=useState([])
    const [load,setLoad]=useState({prev:0,target:0})
    const [attrs,setAttrs]=useState({weight:0,reps:0})
    const [dropAttr,setDropAttr]=useState([{weight:0,reps:0}])
    const [refresh,setRefresh]=useState(false)
    const [curexercise,setCurExercise]=useState(0)
    const [setIndex,setSetIndex]=useState(0)
    const [img,setImg]=useState('')
    useEffect(()=>{
        const setindex=sessionStorage.getItem('setindex')
        if(setindex){
            setSetIndex(setindex)
        }else{
            sessionStorage.setItem('setindex',setIndex)
        }
        const currindex=sessionStorage.getItem('curmuscle')
        if(currindex){
            setCurExercise(currindex)}
        const index=sessionStorage.getItem('curmuscle')
        const info=JSON.parse(sessionStorage.getItem('info'))
        setInfo(info)
        const getdata=async()=>{
            const result = await getData(info[index].name)
            if(result){
                setImg(result.data.imgurl)
                setExercises(result.data.exercises)
                setLoad({prev:result.data.exercises[curexercise].sets[setIndex].load,target:0})
                if(result.data.exercises[curexercise].sets.targetReps===result.data.exercises[curexercise].sets[setindex].reps){
                    let weight=0
                    let reps=0
                    while(weight<load.prev){
                        weight+=(result.data.exercises[curexercise].sets[setIndex].working.weight+result.data.exercises[curexercise].sets.weightIncrement)
                        reps++
                    }
                    setLoad({...load,target:weight})
                    setAttrs({weight:result.data.exercises[curexercise].sets[setIndex].working.weight+result.data.exercises[curexercise].sets.weightIncrement,reps:reps})
                }
                else{
                    setLoad({...load,target:Number(result.data.exercises[curexercise].sets[setIndex].working.weight)+result.data.exercises[curexercise].sets[setIndex].load})
                    setAttrs({weight:Number(result.data.exercises[curexercise].sets[setIndex].working.weight),reps:Number(result.data.exercises[curexercise].sets[setIndex].working.reps)+1})
                }
            }
            console.log(load,attrs)
        }
        getdata()
    },[refresh])
return (
    <div className='start-e'>
        <div class="card">
            <div data-status="inprogress" class="teams">
                <span class="team-info team-home">
                <span class="team-info-container">
                    <span class="team-name-info prev">{exercises.length&&exercises[curexercise].sets[setIndex].load}kg</span>
                </span>
                </span>
                <span class="event-scoreboard">
                <span class="event-score-container">
                    <span class="current-time-container">
                        <img src={img} alt="" />
                    </span>
                    <span class="score-container">
                    <span class="score-away">0kg</span>
                    </span>
                </span>
                </span>
                <span class="team-info team-away">
                <span class="team-info-container">
                    <span class="team-icon-container"></span>
                    <span class="team-name-info target">
                    {exercises.length && 
                        (Number(exercises[curexercise].sets[setIndex].load) + 
                        Number(exercises[curexercise].sets[setIndex].working.weight))}kg
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
                    <div className="rep">{Number(exercises[curexercise].sets[setIndex].working.reps)+1} reps</div>
                    <div className="weight">{exercises[curexercise].sets[setIndex].working.weight} kg</div>
                    <div className="load">{Number(exercises[curexercise].sets[setIndex].working.reps)*Number(exercises[curexercise].sets[setIndex].working.weight)+Number(exercises[curexercise].sets[setIndex].working.weight)}kg load</div>
                </div>
            </div>
            </>}
        
        </div>
    </div>
)
}
