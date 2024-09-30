import React from 'react'
import { useStore } from '../src/store'
import { useNavigate } from 'react-router-dom'

export const All = () => {
    const {setMuscle}=useStore()
    const navigate=useNavigate()
return (
    <div className='all-tab'>
        <div className="muscles">
            <div class="notification" onClick={()=>{setMuscle('chest') 
                navigate('/exercise')}}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle">
                    <h3>Chest</h3>
                </div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/chest-1_ifcuvs-removebg-preview_gvnhb2.png" alt="" />
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification a"  onClick={()=>{
                setMuscle('lats')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Lats</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497907/lats_lrkcif-removebg-preview_wvrdmf.png" alt="" />
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification b" onClick={()=>{
                setMuscle('triceps')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Triceps</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497909/triceps_gjkht0-removebg-preview_qaly0w.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification c"onClick={()=>{
                setMuscle('biceps')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Biceps</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497903/bicep_difpw2-removebg-preview_afy3r9.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification d" onClick={()=>{
                setMuscle('anteriordelt')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Anterior Delt</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497903/anterior_delts_plsncu-removebg-preview_onvaym.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification" onClick={()=>{
                setMuscle('posteriordelt')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Posterior Delt</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497907/posterior_delt_o0bdfn-removebg-preview_uearv7.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification f" onClick={()=>{
                setMuscle('traps')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Traps</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497907/traps_psil80-removebg-preview_hsqrpl.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification g" onClick={()=>{
                setMuscle('quads')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Quads</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497908/quads_cszu6q-removebg-preview_hkgoem.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification h" onClick={()=>{
                setMuscle('hamstrings')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Hamstrings</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497905/hamstrings_nwpqod-removebg-preview_brum3o.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification i" onClick={()=>{
                setMuscle('gluteus')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Glutues</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497904/gluteus_gn6mn8-removebg-preview_pffrsi.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification j" onClick={()=>{
                setMuscle('adductors')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Adductors</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/adductors_xlozk2-removebg-preview_pykaip.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification k" onClick={()=>{
                setMuscle('Gastrocnemius')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Gastrocnemius</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/gastrocnemius_hudn3u-removebg-preview_n6eoca.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="notification l" onClick={()=>{
                setMuscle('abs')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Abs</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/abs_eoeeem-removebg-preview_hckomn.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
         
            <div class="notification m" onClick={()=>{
                setMuscle('forearms')
                navigate('/exercise')
            }}>
                <div class="notiglow"></div>
                <div class="notiborderglow"></div>
                <div class="notititle"><h3>Forearms</h3></div>
                <img src="https://res.cloudinary.com/dutz70yxy/image/upload/v1727497902/forearms_utxezj-removebg-preview_n6kvug.png" alt="" />                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
      </div>
    </div>
  )
}
