import {useState} from 'react'
import './index.css'

export default function Diagnostic(){
    const [status,setStatus]=useState("")
    const [formdata,setFormData]=useState({
        name:"",
        age:"",
        symptoms:""
    })
    const [edit,setEdit]=useState(true)

    async function handleSubmit(e){
        e.preventDefault()
       
        const response=await fetch("http://localhost:3000/openPage/diagnostic",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name:formdata.name,
                age:formdata.age,
                symptoms:formdata.symptoms,
            })
        }
        )
        const data=await response.json()
    }
    function handleChange(e){
        e.preventDefault()
        setFormData({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md rounded-xl border border-gray-300 bg-white p-8 shadow-lg"
  >
    <h2 className="mb-6 text-center text-2xl font-semibold">
      Patient Details
    </h2>

    <div className="space-y-5">
      <div>
        <label className="mb-1 block font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formdata.name}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!edit}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Age</label>
        <input
          type="text"
          name="age"
          value={formdata.age}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!edit}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Symptoms</label>
        <input
          type="text"
          name="symptoms"
          value={formdata.symptoms}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!edit}
        />
      </div>

      <button type="submit" className="w-full rounded-md border px-4 py-2 font-medium hover:bg-gray-100" onClick={()=>{setEdit(false);setStatus("")}}> Submit and Save</button>
      <button
        type="button"
        className="w-full rounded-md border px-4 py-2 font-medium hover:bg-gray-100"
        onClick={()=>{if(!edit){setEdit(!edit)}else{setStatus("You are already in editing mode");setTimeout(()=>{setStatus("")},3000)}}}
      >
        Edit
      </button>
      {!(status==="") && <p className="bg-yellow-200 text-yellow-700 border border-yellow-100 rounded p-4">{status}</p>}
      
    </div>
  </form>
</div>
    )
}