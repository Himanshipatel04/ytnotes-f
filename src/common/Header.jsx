import React, { useEffect } from "react";
import image from "../assets/pic.png";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = ({ searchText, handleSearchText }) => {
  useEffect(() => {
    const searching = async () => {
      if (searchText.length < 3) return;
      const res = await axios.get(
        `http://localhost:8000/notes-search/?search=${searchText}`
      );
      console.log(res);
    };

    searching();
  }, [searchText]);

  return (
    <div className="w-full height-20px p-3 flex items-center justify-start  md:justify-between pl-10 bg-gradient-to-r from-[#AD1457] via-[#9E9E9E] to-sky-900">
      <Link to="/">
        <img className=" h-16" src={image} alt="logo" />
      </Link>
      <div className="hidden md:flex gap-4 pr-6 ">
        <input
          className="p-1 text-xl outline-none border-none h-12 rounded-lg w-[300px] placeholder:text-black placeholder:text-xl placeholder:p-1"
          type="text"
          name=""
          value={searchText}
          onChange={(e) => handleSearchText(e.target.value)}
          id=""
          placeholder="Search..."
        />
        <Link
          to="/noteform"
          className="h-12 flex justify-center items-center font-bold gap-1 px-4 text-lg rounded-lg border-none outline-none text-[#424242] bg-white "
        >
          <RiStickyNoteAddLine /> Add Note
        </Link>
      </div>
    </div>
  );
};

export default Header;
