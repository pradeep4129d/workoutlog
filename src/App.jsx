import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Workout } from '../components/Workout.jsx'
import { All } from '../components/All'
import { Plan } from '../components/Plan'
import { Exercise } from '../components/Exercise'
import { addData, getData, updateData } from './indexedBD'
import { ViewExercise } from '../components/ViewExercise'

function App() {
  const [ids, setIds] = useState(['chest','lats','triceps','biceps','anteriordelt','posteriordelt','traps','quads','hamstrings','gluteus','adductors','gastrocnemius','abs','forearms']);
  const [imgurl,setImageUrl]=useState([
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/chest-1_ifcuvs-removebg-preview_gvnhb2.png",
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497907/lats_lrkcif-removebg-preview_wvrdmf.png",      
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497909/triceps_gjkht0-removebg-preview_qaly0w.png",
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497903/bicep_difpw2-removebg-preview_afy3r9.png"   ,       
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497903/anterior_delts_plsncu-removebg-preview_onvaym.png",
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497907/posterior_delt_o0bdfn-removebg-preview_uearv7.png" ,
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497907/traps_psil80-removebg-preview_hsqrpl.png"         ,
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497908/quads_cszu6q-removebg-preview_hkgoem.png" ,      
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497905/hamstrings_nwpqod-removebg-preview_brum3o.png" ,
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497904/gluteus_gn6mn8-removebg-preview_pffrsi.png" ,    
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/adductors_xlozk2-removebg-preview_pykaip.png" ,  
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/gastrocnemius_hudn3u-removebg-preview_n6eoca.png" ,
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/abs_eoeeem-removebg-preview_hckomn.png" ,
    "https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/forearms_utxezj-removebg-preview_n6kvug.png"
  ])
  useEffect(() => {
    const handleAddData = async () => {
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const data = {
          imgurl: imgurl[i],
          exercises: [], 
        };
        const result = await getData(id);
        if(result===null){
          await addData({ id, data });
        }
      }
      const res1=await getData('routine')
        if(res1===null){
          const date=new Date(2024,9,1);
          await addData({id:'routine',data:{name:'4-days Routine',day:[['chest','anteriordelt','abs'],['triceps','biceps','forearms'],['lats','traps','posteriordelt','forearms','abs'],['quads','hamstrings','adductors','glutues','gastrocnemius']],startDate:date,completed:false,prevday:3}})
        }
    };
    handleAddData()
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<Workout/>}/>
        <Route path='/all' element={<All/>}/>
        <Route path='/plan' element={<Plan/>}/>
        <Route path='/exercise' element={<Exercise/>}>
            <Route path='/exercise/view' element={<ViewExercise/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
