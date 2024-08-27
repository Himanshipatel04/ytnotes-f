import React from "react";
import { FaTags } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

const NoteCard = ({ item }) => {
  const slicer = (text) => {
    if (!text) return "";
    return text.length > 80 ? text.slice(0, 80) + "..." : text;
  };

  return (
    <Link to={`/notedetail/${item.slug}`}>
      <div className="shadow-md bg-white shadow-black w-[400px] h-[220px] rounded-xl p-3 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-[#AD1457] text-[28px] font-bold">{item?.title}</p>
            <FaTags
              size={24}
              className={`font-bold ${
                item.category === "PERSONAL"
                  ? "text-[#7209b7]"
                  : item.category === "BUSINESS"
                  ? "text-[#0b5351]"
                  : "text-[#009fb7]"
              }`}
            />
          </div>
          <span className="text-gray-500 text-md">
            {item?.created.slice(0, 10)}
          </span>
          <div className="mt-3">
            <p className="text-lg">{slicer(item?.body)}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <IoIosMail
            size={24}
            className={`font-bold ${
              item.category === "PERSONAL"
                ? "text-[#7209b7]"
                : item.category === "BUSINESS"
                ? "text-[#0b5351]"
                : "text-[#009fb7]"
            }`}
          />
          <p className="font-bold">{item?.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
