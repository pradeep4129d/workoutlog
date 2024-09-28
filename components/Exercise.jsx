import React, { useEffect, useState } from 'react'
import { useStore } from '../src/store';
import { getData } from '../src/indexedBD';
export const Exercise = () => {
  const {muscle}=useStore()
  const [data,setData]=useState()
  useEffect(()=>{
    const handleGetData = async (muscle) => {
      const result = await getData(muscle.name);
      console.log(result)
      setData(result)
    };
    handleGetData(muscle)
  },[])
  return (
    <div className='exercise-tab'>
    </div>

  )
}
