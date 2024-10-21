import { useState } from "react";
import { getData, updateData } from "../src/indexedBD";

export const ShowList=({refreshParent,index})=>{
    const [ids, setIds] = useState(['chest','lats','triceps','biceps','anteriordelt','posteriordelt','traps','quads','hamstrings','gluteus','adductors','gastrocnemius','abs','forearms']);
    return (
        <div className="cover">
        <div className="showlist">
            {ids.map((muscle,i)=>{
                return <div className="e" onClick={async()=>{
                    const res=await getData('routine')
                    if(res){
                        res.data.day[index].push(ids[i])
                        await updateData(res)
                    }
                    refreshParent()}}>
                    <p>{muscle}</p>
                </div>
            })}
        </div>
        </div>
    )
}