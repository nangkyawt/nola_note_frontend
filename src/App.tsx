/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import NewNoteCard from "./components/NewNoteCard";
import NoteCard from "./components/NoteCards";
import type { Note, NewNote } from "./types";
import { getNotes, createNote, deleteNote, updateNote } from "./service/api";
import Navbar from "./components/Navbar";
import NoteIcon from "./assets/images/note.png";
import { useNavigate, Routes, Route, useLocation, Navigate } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage";
import Toast from "./components/Toast"; 
import LoginPage from "./pages/LoginPage";
import { SearchIcon, HomeIcon, PlusIcon, UserIcon, BookmarkIcon } from "@heroicons/react/outline";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // TOAST STATE
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [username, setUsername] = useState<string | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.username;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    if (location.state?.toastMessage) {
      showToast(location.state.toastMessage, location.state.toastType || "success");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes();
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };

    if (username) {
      fetchNotes();
    } else {
      setNotes([]); 
    }

    const handleUserChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        const user = JSON.parse(updatedUser);
        setUsername(user.username);
      } else {
        setUsername(null);
        setNotes([]);
      }
    };

    window.addEventListener("userChange", handleUserChange);
    return () => window.removeEventListener("userChange", handleUserChange);
  }, [username]);

  const addNote = async (note: NewNote) => {
    try {
      const res = await createNote(note);
      setNotes((prev) => [res.data, ...prev]);
      setShowNewNote(false);
      showToast("Note added successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to add note.", "error");
    }
  };

  const deleteNoteHandler = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
      showToast("Note deleted successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete note.", "error");
    }
  };

  // const togglePinHandler = async (note: Note) => {
  //   try {
  //     const updatedNote = await updateNote(note._id, { ...note, pinned: !note.pinned });
  //     setNotes(notes.map((n) => (n._id === note._id ? updatedNote.data : n)));
  //     showToast(note.pinned ? "Note unpinned!" : "Note pinned!", "success");
  //   } catch (err) {
  //     console.error(err);
  //     showToast("Failed to update note.", "error");
  //   }
  // };
const togglePinHandler = async (note: Note) => {
  try {
    const message = note.pinned ? "Note unpinned!" : "Note pinned!";
    const res = await updateNote(note._id, { ...note, pinned: !note.pinned });
    setNotes(prevNotes => 
      prevNotes.map((n) => (n._id === note._id ? res.data : n))
    );
    showToast(message, "success");
    
  } catch (err) {
    console.error("Update error:", err);
    showToast("Failed to update note.", "error");
  }
};

  const filteredNotes = notes
    .filter((n) => {
      
      const searchLower = search.toLowerCase();
      return (
        n.title.toLowerCase().includes(searchLower) ||
        n.content.toLowerCase().includes(searchLower) ||
        (n.tags && n.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
        
      );
    })
    .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1));

  function handleAddNoteWithDate(date: string): void {
    setEditingNote({
      _id: "",
      title: "",
      content: "",
      text: "",
      color: "bg-pink-100",
      emoji: "📝",
      pinned: false,
      tags: [],
      createdAt: date,
      updatedAt: date,
    });
    setShowNewNote(true);
  }

  return (
    <>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}

      <Routes>
        <Route
          path="/login"
          element={
            username ? <Navigate to="/notes" /> : (
              <LoginPage
                onLogin={() => {
                  const user = JSON.parse(localStorage.getItem("user") || "{}");
                  setUsername(user.username);
                  showToast("Logged in successfully!", "success");
                }}
              />
            )
          }
        />

        <Route
          path="/"
          element={
            <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 min-h-screen">
              <div className="hidden sm:block">
                <Navbar
                  onLogout={() => console.log("Logout")}
                  isLoggedIn={!!username}
                  username={username || ""}
                  onLogin={() => {}}
                />
              </div>

              <div className="sm:hidden px-4 pt-6 pb-2 flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Hello, Good Morning👋</p>
                  <h2 className="text-lg font-semibold text-pink-600"> {username || "User"}</h2>  
                </div>
                <div className="bg-pink-100 p-2 rounded-full">
                  <UserIcon className="w-5 h-5 text-pink-500" />
                </div>
              </div>

              <div className="w-full max-w-5xl mx-auto mt-4 sm:mt-10 mb-6 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1
                    className="text-4xl font-bold text-pink-600 flex items-center gap-3"
                    style={{ fontFamily: "Quicksand" }}
                  >
                    <img src={NoteIcon} alt="note icon" className="w-8 h-8" />
                    MyNotes
                  </h1>
                  <p className= "text-pink-600 text-sm mt-1">
                    {notes.length} {notes.length === 1 ? "note" : "notes"}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search notes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingNote(null);
                  setShowNewNote(true);
                }}
                className="hidden sm:flex fixed bottom-6 right-6 px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition text-sm items-center gap-1 z-50"
              >
                + New
              </button>

             {showNewNote && (
  <NewNoteCard
    initialNote={editingNote ?? null}
    onSave={(updatedNote) => {
      if (editingNote && editingNote._id) {
        const edited = { ...editingNote, ...updatedNote, pinned: editingNote.pinned };
        
        updateNote(edited._id, edited).then((res) => {
          setNotes(notes.map((n) => (n._id === edited._id ? res.data : n)));
                showToast("Note updated successfully!", "success");
        }).catch((err) => {
          console.error(err);
          showToast("Failed to update note.", "error");
        });

      } else {

        addNote(updatedNote); 
      }
      
      setShowNewNote(false);
      setEditingNote(null);
    }}
    onCancel={() => {
      setShowNewNote(false);
      setEditingNote(null);
    }}
  />
)}

              <div className="w-full max-w-5xl mx-auto px-4 mb-10 pb-24">
                {filteredNotes.some((n) => n.pinned) && (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-pink-200/40 backdrop-blur-md text-pink-600 font-semibold text-sm rounded-full shadow-sm">
                        Pinned
                      </span>

                      <button
                        onClick={() => navigate("calendar")} 
                        className="px-3 py-1 text-sm bg-white/30 rounded-full text-pink-600"
                      >
                        📅 Calendar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {filteredNotes
                        .filter((n) => n.pinned)
                        .map((note) => (
                          <NoteCard
                            key={note._id}
                            note={note}
                            onDelete={deleteNoteHandler}
                            onTogglePin={() => togglePinHandler(note)}
                            onEdit={() => {
                              setEditingNote(note);
                              setShowNewNote(true);
                            }}
                          />
                        ))}
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-pink-200/40 backdrop-blur-md text-pink-600 font-semibold text-sm rounded-full shadow-sm">
                    All Notes
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes
                    .filter((n) => !n.pinned)
                    .map((note) => (
                      <NoteCard
                        key={note._id}
                        note={note}
                        onDelete={deleteNoteHandler}
                        onTogglePin={() => togglePinHandler(note)}
                        onEdit={() => {
                          setEditingNote(note);
                          setShowNewNote(true);
                        }}
                      />
                    ))}
                </div>
              </div>

              <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t shadow-lg flex justify-around items-center py-2 sm:hidden z-50">
                <button className="flex flex-col items-center text-pink-500">
                  <HomeIcon className="w-5 h-5" />
                  <span className="text-xs">Notes</span>
                </button>
                <button className="flex flex-col items-center text-gray-400 hover:text-pink-500 transition">
                  <SearchIcon className="w-5 h-5" />
                  <span className="text-xs">Search</span>
                </button>
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setShowNewNote(true);
                  }}
                  className="bg-gradient-to-r from-pink-500 to-rose-400 p-3 rounded-full shadow-xl -mt-6"
                >
                  <PlusIcon className="w-6 h-6 text-white" />
                </button>
                <button className="flex flex-col items-center text-gray-400 hover:text-pink-500 transition">
                  <BookmarkIcon className="w-5 h-5" />
                  <span className="text-xs">Pinned</span>
                </button>
                <button className="flex flex-col items-center text-gray-400 hover:text-pink-500 transition">
                  <UserIcon className="w-5 h-5" />
                  <span className="text-xs">Me</span>
                </button>
              </div>
            </div>
          }
        />

        <Route
          path="/calendar"
          element={<CalendarPage notes={notes} onAddNoteWithDate={handleAddNoteWithDate} />}
        />
      </Routes>
    </>
  );
};

export default App;