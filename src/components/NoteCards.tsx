/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import type { Note } from "../types";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTogglePin: (note: Note) => void;
  onEdit: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onDelete,
  onTogglePin,
  onEdit,
}) => {
  return (
    <div
      className={`relative p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col transition-transform duration-300 hover:shadow-2xl hover:scale-105 ${note.color || "bg-white"}`}
    >
      {/* Pinned badge */}
      {/* {note.pinned && (
        <span className="absolute top-2 right-2 text-yellow-400 text-xl drop-shadow-md">
          📌
        </span>
      )} */}

      {/* Title + Emoji + Actions */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-base sm:text-lg flex items-center gap-3">
          {/* Emoji Badge */}
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/50 text-lg sm:text-xl shadow-sm">
            {note.emoji || "📝"}
          </span>
          {note.title || "Untitled"}
        </h3>

<div className="flex gap-2 items-center">
  {/* Pin toggle */}
  <button
    onClick={() => onTogglePin(note)}
    className="bg-white/30 p-1 rounded-full shadow hover:bg-yellow-200 transition-transform hover:scale-110"
  >
    {note.pinned ? "⭐" : "☆"}
     
  </button>



  {/* Edit icon */}
  <button
    onClick={() => onEdit(note)}
    className="bg-white/30 p-1 rounded-full shadow hover:bg-blue-200 transition-transform hover:scale-110"
  >
    <PencilIcon className="w-4 h-4 text-blue-600" />
  </button>

  {/* Delete icon */}
  <button
    onClick={() => onDelete(note._id)}
    className="bg-white/30 p-1 rounded-full shadow hover:bg-red-200 transition-transform hover:scale-110"
  >
    <TrashIcon className="w-4 h-4 text-red-600" />
  </button>
</div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm sm:text-base mb-2 line-clamp-4">
        {note.content}
      </p>

      {/* Footer: tags + time */}
      <div className="flex justify-between items-center mt-auto text-gray-500 text-xs sm:text-sm">
        {/* Tags */}
        <div className="flex gap-1 flex-wrap">
          {note.tags && note.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs px-2 py-1 bg-white/30 backdrop-blur-sm rounded-full text-purple-600 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Time & Date */}
<span className="italic text-pink-500 font-medium">
  {new Date(note.updatedAt || note.createdAt).toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  })} • {new Date(note.updatedAt || note.createdAt).toLocaleDateString([], { 
    month: "short", 
    day: "numeric" 
  })}
</span>
      </div>
    </div>
  );
};

export default NoteCard;