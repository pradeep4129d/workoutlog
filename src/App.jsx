import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Workout } from '../components/Workout'
import { All } from '../components/All'
import { Plan } from '../components/Plan'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Workout/>}/>
        <Route path='/all' element={<All/>}/>
        <Route path='/plan' element={<Plan/>}/>
      </Routes>
    </>
  )
}

export default App
