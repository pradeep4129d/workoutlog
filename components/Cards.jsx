import React, { useEffect, useState } from 'react'
import { getData,updateData } from '../src/indexedBD'
import { useStore } from '../src/store';

const Cards = (props) => {
    const [data, setData] = useState([]);
    const [Info,setInfo]=useState([])
    const {setShowCard}=useStore()
    useEffect(() => {
    const fetchData = async () => {
        const resultArray = [];
        const result=await getData('info')
        setInfo(result.data)
        for (let i = 0; i < props.data.length && i < 3; i++) {
        const result = await getData(props.data[i]); 
        resultArray.push({
            text: props.data[i],
            imgurl: result.data.imgurl
        });
        }
        setData(resultArray); 
    };
    fetchData();
    }, [props.data]);

return (
    <div className="Card">
        {data.map((item, index) => (
            <div className="container" key={index}>
                <div  data-text={item.text} className="glass">
                    <img src={item.imgurl} alt={item.text} />
                    <button className="button" onClick={()=>{
                        updateData({id:'curmuscle',data:index})
                        .then(() => console.log("Record updated successfully"))
                        .catch(error => console.error("Failed to update record: ", error));
                        Info[index].resume=true
                        updateData({id:'info',data:Info})
                        .then(() => console.log("Record updated successfully"))
                        .catch(error => console.error("Failed to update record: ", error));
                        setShowCard(false)}}>{Info[index].completed?<>completed</>:Info[index].resume?<>resume</>:<>start</>}</button>
                </div>
        </div>
        ))}
    </div>
    );
}

export default Cards