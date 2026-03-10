/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import type { Note } from "../types";
import { TagIcon } from "@heroicons/react/outline";

interface NewNoteCardProps {
  onSave: (note: Note) => void;
  onCancel: () => void;
}

// Predefined colors and emojis
const colors = [
  "bg-pink-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-purple-100",
];

const emojis = ["📝", "💡", "⭐", "💖", "📌"];

const NewNoteCard: React.FC<NewNoteCardProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [emoji, setEmoji] = useState(emojis[0]);
  const [tags, setTags] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    onSave({
      id: Date.now(),
      title,
      content,
      color,
      emoji,
      pinned: false,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
      text: "",
    });

    setTitle("");
    setContent("");
    setTags("");
    setColor(colors[0]);
    setEmoji(emojis[0]);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center p-4 z-50">
      <div
        className={`w-[92%] sm:w-full max-w-md p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col ${color} transition`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            New Note
          </h2>
          <button
            onClick={onCancel}
            className="text-red-500 font-bold text-lg hover:text-red-600 transition"
          >
            ✖
          </button>
        </div>

        {/* Title with Emoji Picker */}
        <div className="relative mb-2">
          <span
            className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl cursor-pointer"
            onClick={() => setShowEmoji(!showEmoji)}
          >
            {emoji}
          </span>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Emoji dropdown */}
          {showEmoji && (
            <div className="absolute left-0 top-full mt-1 p-2 bg-white border rounded shadow-md flex gap-2 flex-wrap w-full z-10">
              {emojis.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    setEmoji(e);
                    setShowEmoji(false);
                  }}
                  className={`text-lg ${
                    emoji === e ? "scale-125" : ""
                  } hover:scale-125 transition-transform`}
                >
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <textarea
          rows={3}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Tags */}
        <div className="relative mb-2">
          <TagIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Color Picker */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                className={`w-8 h-8 rounded-full border ${c} ${
                  color === c ? "ring-2 ring-pink-500" : ""
                }`}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition shadow-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNoteCard;
