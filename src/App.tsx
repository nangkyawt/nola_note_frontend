/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import type { Note } from "./types";
import NewNoteCard from "./components/NewNoteCard";
import NoteCard from "./components/NoteCards";
import NoteIcon from "./assets/images/note.png";
import { SearchIcon } from "@heroicons/react/outline";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Note) => {
    setNotes([note, ...notes]);
    setShowNewNote(false);
    setEditingNote(null);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const togglePin = (id: number) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const editNote = (note: Note) => {
    setEditingNote(note);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      (n.tags?.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      ) ?? false)
  );

  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const unpinnedNotes = filteredNotes.filter((n) => !n.pinned);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <Navbar
        onLogout={() => console.log("Logout clicked")}
        isLoggedIn={false}
        username=""
        onLogin={() => { throw new Error("Function not implemented."); }}
      />

      {/* Header */}
{/* Header */}
<div className="w-full max-w-5xl mx-auto mt-12 mb-6 px-4 lg:px-0 flex flex-col sm:flex-row sm:items-center lg:justify-between lg:gap-20 gap-4">
  {/* Left: Title + Count */}
  <div>
    <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3" style={{ fontFamily: "Quicksand" }}>
      <img src={NoteIcon} alt="note icon" className="w-8 h-8" />
      MyNotes
    </h1>
    <p className="text-gray-500 text-sm mt-1">{notes.length} {notes.length === 1 ? "note" : "notes"}</p>
  </div>

  {/* Right: Search + New Note */}
  <div className="w-full sm:w-auto flex items-center gap-3">
    {/* Search */}
    <div className="relative flex-1 sm:flex-none sm:w-64 lg:w-72">
      <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm text-sm sm:text-sm lg:text-base"
      />
    </div>

    {/* New Note Button */}
    <button
      onClick={() => setShowNewNote(true)}
      className="px-5 py-2 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition font-medium text-sm sm:text-sm lg:text-base"
    >
      + New Note
    </button>
  </div>
</div>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div className="w-full max-w-5xl mx-auto mb-8 px-4 lg:px-0">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Pinned</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onTogglePin={togglePin}
                onEdit={editNote}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Notes */}
      <div className="w-full max-w-5xl mx-auto mb-10 px-4 lg:px-0">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">All Notes</h2>

        {unpinnedNotes.length === 0 ? (
          <p className="text-gray-400 text-center">No notes yet. Create your first note to get started!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unpinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={deleteNote}
                onTogglePin={togglePin}
                onEdit={editNote}
              />
            ))}
          </div>
        )}
      </div>

      {/* New / Edit Note Modal */}
      {(showNewNote || editingNote) && (
        <NewNoteCard
          onSave={addNote}
          onCancel={() => {
            setShowNewNote(false);
            setEditingNote(null);
          }}
          {...(editingNote ? { initialData: editingNote } : {})}
        />
      )}
    </div>
  );
};

export default App;