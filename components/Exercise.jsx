import React, { useEffect, useState } from 'react'
import { useStore } from '../src/store';
import { getData } from '../src/indexedBD';
import { ViewExercise } from './ViewExercise';

export const Exercise = () => {
  const {muscle}=useStore()
  const [data,setData]=useState('')
  useEffect(()=>{
    const handleGetData = async () => {
      const id=sessionStorage.getItem('muscle')
      const result = await getData(id);
      console.log(result)
      setData(result)
    };
    handleGetData(muscle)
  },[])
  return (
    <div className='exercise-tab'>
      {data&& <ViewExercise data={data}/>}

    </div>

  )
}
