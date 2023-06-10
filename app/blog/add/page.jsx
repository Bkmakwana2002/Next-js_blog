"use client"

import { Fragment, useRef } from "react"
import {  Toaster,toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

function AddBlog() {
 const titleRef = useRef(null)
 const descRef = useRef(null)
 const router = useRouter()

 const postBlog = async({ title,description })=>{
     const res = fetch(`http://localhost:3000/api/blog`,{ method:"POST",body:JSON.stringify({ title,description }),"Content-Type":"application/json" })
     return (await res).json()
 }
 const handleSubmit = async(e)=>{
  e.preventDefault()
  console.log(titleRef.current.value)
  console.log(descRef.current.value)
  toast.loading("Adding Blog",{ id:"1" })
  await postBlog({ title:titleRef.current.value,description:descRef.current.value })
  toast.success("Blog Posted",{ id:"1" })
  router.push('/')
 }

  return (
    <Fragment>
        <Toaster/>
        <div className="w-full m-auto flex my-4">
            <div className="flex flex-col justify-center items-center m-auto">
                <p className="text-2xl text-slate-200 font-bold p-3">
                    Add a blog
                </p>
                <form onSubmit={handleSubmit}>
                    <input required ref={titleRef} placeholder="Enter Title" type="text" className="rounded-md px-4 py-2 my-2 w-full"/>
                    <textarea required ref={descRef} placeholder="Enter Description" className="rounded-md px-4 py-2 my-2 w-full"/>
                    <button className="font-semibold px-4 py-2 shadow-xl bg-green-300 rounded-lg m-auto hover:bg-green-200">Submit</button>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default AddBlog