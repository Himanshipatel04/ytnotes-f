import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import axios from "axios";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/notes/");
        setNotes(response.data);
        setFilteredNotes(response.data);
      } catch (error) {
        console.log(`Error while fetching notes: ${error?.message}!`);
        alert("Failed to fetch notes, please try again later.");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredNotes(
        notes.filter((note) => note.category === selectedCategory)
      );
    } else {
      setFilteredNotes(notes);
    }
  }, [selectedCategory, notes]);

  return (
    <div className="w-full px-32 bg-[#E0E0E0] h-fit pb-10">
      <div className="text-center">
        <select
          className="w-[500px] px-4 border-none outline-none bg-[#9E9E9E] text-xl border-[#AD1457] h-16 rounded-lg mt-5"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Notes</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>
      <div className="mt-12 flex items-center justify-center flex-wrap gap-12">
        {filteredNotes.map((item, key) => (
          <NoteCard key={key} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
