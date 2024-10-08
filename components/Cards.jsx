import React, { useEffect, useState } from 'react'
import { getData } from '../src/indexedBD'
import { useStore } from '../src/store';

const Cards = (props) => {
    const [data, setData] = useState([]);
    const [Info,setInfo]=useState([])
    const {setShowCard}=useStore()
    useEffect(() => {
        const info=JSON.parse(sessionStorage.getItem('info'))
        setInfo(info)
    const fetchData = async () => {
        const resultArray = [];
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
                        sessionStorage.setItem('curmuscle',index)
                        setShowCard(false)}}>{Info[index].completed?<>completed</>:Info[index].resume?<>resume</>:<>start</>}</button>
                </div>
        </div>
        ))}
    </div>
    );
}

export default Cards