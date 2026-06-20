import {useState} from 'react'
import './index.css'
import {useNavigate} from 'react-router-dom'
import { isTokenExpired } from './isTokenExpire'


export default function Login(){
const nav=useNavigate()
const [fdata,setForm]=useState({ n:"",pass:""})
const [status,setStatus]=useState("")

    async function handleSubmit(e){
        e.preventDefault()
        setStatus("Logging In")

     try{
       const response = await fetch("http://localhost:3000/openPage/login", {
             method: "POST",
             headers: {
                    "Content-Type": "application/json",
             },
            body: JSON.stringify({
               username:fdata.n,
               password:fdata.pass
            }),
        });

        const data = await response.json();
        setStatus(data.msg)
        console.log(data.token)
        if(data.token && !isTokenExpired(data.token)){
             localStorage.setItem("token",data.token)
             nav('/dashboard')
        }
        }   
        catch(err){
        console.log(err)
    }
    }
    function handleChange(e){
        setForm({
            ...fdata,
            [e.target.name]:e.target.value
        })
    }
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            
           {/* <div className='flex justify-between w-full max-w-md'> */}
           
            <div>Login</div>
           {/* </div> */}
           <div  className="border border-black rounded-lg p-10 shadow-md">
            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="n" value={fdata.n} onChange={handleChange}  className="border border-black"/><br></br>
                password:<input type="password" name="pass" value={fdata.pass} onChange={handleChange}  className="border border-black"/><br/>
               <button type='submit' className="box-border border-black p-5 hover:bg-red-500">Submit</button>       
                {status}
               
            </form>
            </div>
            
        </div>
    )
}