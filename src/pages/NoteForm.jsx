import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");

  const notifySuccess = () => toast.success("Note added successfully!");
  const notifyError = (message) => toast.error(`Error: ${message}`);

  const handleSubmit = async () => {
    if (!title || !body || !category) {
      notifyError("All fields are required!");
      return;
    }

    const data = { title, body, category };
    console.log("Submitting data:", data); 
  
    try {
      await axios.post("http://127.0.0.1:8000/notes/", data, { withCredentials: true });
      notifySuccess();
      setTimeout(() => {
        navigate("/");
      }, 2000); 
    } catch (error) {
      console.error("Error adding note:", error.response ? error.response.data : error.message);
      notifyError(error.response ? error.response.data.detail : error.message);
    }
  };
  

  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="h-[600px] w-[500px] shadow-lg shadow-slate-700 p-6 flex flex-col items-center justify-center gap-10 ">
        <p className="text-3xl">Add Note</p>
        <div>
          <p className="text-xl font-semibold">Title</p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter note's title..."
            className="rounded-md outline-none border-none p-2 shadow-[#AD1457] shadow-sm mt-2 h-10 w-[400px]"
          />
        </div>
        <div>
          <p className="text-xl font-semibold">Content</p>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            className="outline-none border-none rounded-md p-2 shadow-[#AD1457] shadow-sm mt-2 h-24 w-[400px]"
            placeholder="Enter note's content..."
          ></textarea>
        </div>
        <div>
          <p className="text-xl font-semibold">Note's category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md outline-none border-none shadow-[#AD1457] shadow-sm mt-2 h-10 w-[400px]"
          >
            <option value="">Pick a Category</option>
            <option value="BUSINESS">Business</option>
            <option value="IMPORTANT">Important</option>
            <option value="PERSONAL">Personal</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="rounded-md outline-none border-none p-2 bg-gradient-to-r from-[#AD1457] via-[#9E9E9E] to-sky-900 mt-2 h-10 w-[400px]"
        >
          Add Note
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NoteForm;
