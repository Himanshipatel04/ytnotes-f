import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditNote = () => {
  const Router = useNavigate()
  const {slug} = useParams()
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
  const [body,setBody] = useState("")

  useEffect(() => {
    const fetchNote = async () => {
       try {
          const response = await axios.get(`http://127.0.0.1:8000/notes/${slug}/`);
          console.log(response.data);
          setTitle(response.data.title)
          setBody(response.data.body)
          setCategory(response.data.category)
          
       } catch (error) {
          console.error(`Error fetching note: ${error.message}`);
          toast.error(`Error fetching note: ${error.message}`);
       }
    };

    fetchNote();
 }, [slug]);

   const updatedNote = {title:title,body:body,category:category}

   const updateNote = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/notes/${slug}/`, updatedNote);
      toast.success("Note updated successfully!");
      setTimeout(()=>{
        Router("/")
      },2000)
    } catch (error) {
      console.error(`Error updating note: ${error.message}`);
      toast.error(`Error updating note: ${error.message}`);
    }
  };


  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="h-[600px] w-[500px] shadow-lg shadow-slate-700 p-6 flex flex-col items-center justify-center gap-10 ">
        <p className="text-3xl">Update Note</p>
        <div><p className="text-xl font-semibold">Title</p>
        <input
           value={title}
           onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter note's title..."
          name=""
          id=""
          className="rounded-md  p-2 shadow-[#AD1457] shadow-sm mt-2 h-10 w-[400px]"
        /></div>
        <div><p className="text-xl font-semibold">Content</p>
          <textarea name="" id="" value={body} onChange={(e)=> setBody(e.target.value)} className=" outline-none border-none rounded-md p-2 shadow-[#AD1457] shadow-sm mt-2 h-24 w-[400px]"  placeholder="Enter note's content..."></textarea>
         
        </div>
        <div><p className="text-xl font-semibold">Note's category</p>
        <select name="" id="" onChange={(e)=> setCategory(e.target.value)} value={category} className="rounded-md outline-none border-none shadow-[#AD1457] shadow-sm mt-2 h-10 w-[400px]">
          <option value="">Pick a Category</option>
          <option value="BUSINESS">Business</option>
          <option value="IMPORTANT">Important</option>
          <option value="PERSONAL">Personal</option>
        </select></div>
        <button onClick={updateNote} className="rounded-md outline-none border-none p-2 bg-gradient-to-r from-[#AD1457] via-[#9E9E9E] to-sky-900 mt-2 h-10 w-[400px]" type="submit">Update Note</button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default EditNote;
