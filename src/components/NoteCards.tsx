/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import type { Note } from "../types";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void;
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
      className={`relative p-3 sm:p-4 rounded-2xl shadow-md flex flex-col transition hover:shadow-xl ${
        note.color || "bg-white"
      }`}
    >
      {/* Pinned badge */}
      {note.pinned && (
        <span className="absolute top-2 right-2 text-yellow-400 text-xl">
          📌
        </span>
      )}

      {/* Title + Emoji + Actions */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
          <span className="text-lg sm:text-xl">{note.emoji || "📝"}</span>
          {note.title || "Untitled"}
        </h3>

        <div className="flex gap-1 sm:gap-2 items-center">
          {/* Pin toggle */}
          <button
            onClick={() => onTogglePin(note.id)}
            className="text-pink-500 hover:text-pink-700"
          >
            {note.pinned ? "📌" : "📍"}
          </button>

          {/* Edit icon */}
          <button
            onClick={() => onEdit(note)}
            className="text-gray-600 hover:text-gray-800"
          >
            <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Delete icon */}
          <button
            onClick={() => onDelete(note.id)}
            className="text-red-500 hover:text-red-700"
          >
            <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm sm:text-base mb-2 line-clamp-4">
        {note.content}
      </p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-auto">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs px-2 py-1 bg-white/70 rounded-full text-pink-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteCard;

