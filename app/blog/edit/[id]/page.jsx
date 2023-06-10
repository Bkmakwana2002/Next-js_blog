"use client"

import { Fragment, useEffect, useRef } from "react"
import { Toaster, toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

const getBlogById = async (id) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`)
    const data = await res.json()
    return data.post
}

function EditPage({ params }) {
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const router = useRouter()

    const editBlog = async (data) => {
        const res = fetch(`https://next-js-blog-zeta-seven.vercel.app/api/blog/${data.id}`, { method: "PUT", body: JSON.stringify({ title: data.title, description: data.description }), "Content-Type": "application/json" })
        return (await res).json()
    }

    const deleteBlog = async (id) => {
        const res = fetch(`https://next-js-blog-zeta-seven.vercel.app/api/blog/${id}`, { method: "DELETE", "Content-Type": "application/json" })
        return (await res).json()
    }

    const handleDelete = async () => {
        toast.loading("Deleting Blog", { id: "2" })
        await deleteBlog(params.id)
        toast.success("Blog Deleted", { id: "2" })
        router.push('/')
    }

    useEffect(() => {
        toast.loading("Fetching Blog Details", { id: "1" })
        getBlogById(params.id).then((data) => {
            titleRef.current.value = data.title
            descRef.current.value = data.description
            toast.success("Loaded", { id: "1" })
        }).catch((err) => {
            console.log(err)
            toast.error("Error Occured", { id: "1" })
        })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(titleRef.current.value)
        console.log(descRef.current.value)
        toast.loading("Editing Blog", { id: "1" })
        await editBlog({ title: titleRef.current.value, description: descRef.current.value, id: params.id })
        toast.success("Blog Edited", { id: "1" })
        router.push('/')
    }

    return (
        <Fragment>
            <Toaster />
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-200 font-bold p-3">
                        Edit the blog
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input required ref={titleRef} placeholder="Enter Title" type="text" className="rounded-md px-4 py-2 my-2 w-full" />
                        <textarea required ref={descRef} placeholder="Enter Description" className="rounded-md px-4 py-2 my-2 w-full" />
                        <div className="flex justify-between my-5">
                            <button className="font-semibold px-6 py-2 shadow-xl bg-slate-400 rounded-lg m-auto hover:bg-slate-200">Edit</button>
                        </div>
                    </form>
                    <button onClick={handleDelete} className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-200">Delete</button>
                </div>
            </div>
        </Fragment>
    )
}

export default EditPage