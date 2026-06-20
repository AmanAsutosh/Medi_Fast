import './index.css'
import catImage from '../assets/cat.jpg'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
    const [cred,setCred]=useState({
        name:""
    })
    const nav=useNavigate()

    useEffect(()=>{
        const token=localStorage.getItem("token")
        const decoded=jwtDecode(token)
        setCred({name:decoded.username})
    },[])
    function handleDiagnostic(){
       nav('/diagnostic')
    }
    return (
        <div>
        <img src={catImage} alt="Cat" className="h-50 w-50 "/>
        <button className="p-5" onClick={handleDiagnostic}>Diagnostic</button>
        {cred.name}
        </div>
    )
}