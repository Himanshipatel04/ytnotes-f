import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NoteDetail = () => {
  const { slug } = useParams();
  const [notes, setNotes] = useState({});
  const Router = useNavigate()

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/notes/${slug}/`);
      toast.success("Note deleted successfully!");
      setTimeout(()=>{
         Router("/")
      },2000)
    } catch (error) {
      console.log(`Error from handleDelete : ${error}`);
      toast.error(`Error deleting note:${error}`)
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/notes/${slug}/`
        );
        setNotes(response.data);
      } catch (error) {
        console.error(`Error fetching note: ${error.message}`);
      }
    };

    fetchNote();
  }, [slug]);

  return (
    <div className="w-full h-[675px] flex items-center justify-center bg-[#E0E0E0]">
      <div className="w-[800px] shadow-gray-500 shadow-md rounded-lg p-20 bg-white flex flex-col gap-6">
        <p className="text-4xl font-bold tracking-wide text-center px-4 overflow-hidden text-ellipsis whitespace-nowrap">
          {notes.title}
        </p>
        <div className="flex items-center justify-center gap-28">
          <p className="text-xl text-gray-500">
            Created: {notes.created?.slice(0, 10)}
          </p>
          <p className="text-xl text-gray-500">
            Updated: {notes.updated?.slice(0, 10)}
          </p>
        </div>
        <div className="flex items-center justify-center gap-16">
          <Link to={`/editnote/${slug}`}>
            <button className="bg-gradient-to-r from-[#AD1457] via-[#9E9E9E] to-sky-900 h-12 p-4 rounded-md text-xl font-semibold flex items-center justify-center gap-2">
              Edit <FiEdit />
            </button>
          </Link>
          <Link onClick={handleDelete}>
            <button className="bg-gradient-to-r from-[#AD1457] via-[#9E9E9E] to-sky-900 h-12 p-4 rounded-md text-xl font-semibold flex items-center justify-center gap-1">
              Delete <MdDelete className="text-2xl" />
            </button>
          </Link>
        </div>
        <div className="text-lg text-center mt-10 ">{notes.body}</div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default NoteDetail;
