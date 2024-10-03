import React, { useEffect, useState } from 'react'
import { getData } from '../src/indexedBD'

const Cards = (props) => {
    const [urls,setUrls]=useState([])
    useEffect(()=>{
        const getUrl=async(id)=>{
            
        }
        getUrl()
    },[])
    return (
    <div className="container">
        <div data-text="Github" style={{ '--r': '-15' }} className="glass">
            <img src={urls[0]} alt="" />
        </div>
        <div data-text="Code" style={{ '--r': '5' }} className="glass">
        <img src={urls[1]} alt="" />
        </div>
        <div data-text="Earn" style={{ '--r': '25' }} className="glass">
        <img src={urls[2]} alt="" />
        </div>
    </div>
)
}

export default Cards