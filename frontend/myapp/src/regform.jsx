import {useState} from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

export default function Registration(){
const nav=useNavigate()
const [fdata,setForm]=useState({
    n:"",
    pass:""
})
const [status,currentStatus]=useState("")
const [msg,setmsg]=useState({
    tmsg:"",
    token:""
})

    async function handleSubmit(e){
        e.preventDefault()
        if(!fdata.n || !fdata.pass){
            currentStatus("missing fields")
        }else{
            currentStatus("Submitted")
              setTimeout(()=>{
            currentStatus("")
        },3000)

       const response = await fetch("http://localhost:3000/openPage/register", {
             method: "POST",
             headers: {
                    "Content-Type": "application/json",
             },
            body: JSON.stringify({
                username: fdata.n,
                password: fdata.pass,
            }),
        });

        const data = await response.json();
        setmsg({
            tmsg:data.msg,
            token:data.token
        })
        localStorage.setItem("token",data.token)
        nav('/dashboard')
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
            <div>
           <div className='flex justify-between w-full max-w-md'>
            <span>Register</span>
            <span>Login</span>
           </div>
           <div  className="border border-black rounded-lg p-10 shadow-md">
            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="n" value={fdata.n} onChange={handleChange}  className="border border-black"/><br></br>
                password:<input type="password" name="pass" value={fdata.pass} onChange={handleChange}  className="border border-black"/><br/>
               <button type='submit' className="box-border border-black p-5 hover:bg-red-500">Submit</button>       
                {status}
                <p>{msg.tmsg}</p>
                <p>{msg.token}</p>
            </form>
            </div>
            </div>
        </div>
    )
}