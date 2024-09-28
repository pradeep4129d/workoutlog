import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Workout } from '../components/Workout'
import { All } from '../components/All'
import { Plan } from '../components/Plan'
import { Exercise } from '../components/Exercise'
import { addData } from './indexedBD'

function App() {
  const [count, setCount] = useState(0)
  const [id, setId] = useState('chest');
  const [data, setData] = useState({exercises:3,sets:9});
  useEffect(()=>{
    const handleAddData = async () => {
      await addData({ id, data });
      setId('');
      setData('');
    };
    handleAddData();
  },[id])
  return (
    <>
      <Routes>
        <Route path='/' element={<Workout/>}/>
        <Route path='/all' element={<All/>}/>
        <Route path='/plan' element={<Plan/>}/>
        <Route path='/exercise' element={<Exercise/>}/>
      </Routes>
    </>
  )
}

export default App
