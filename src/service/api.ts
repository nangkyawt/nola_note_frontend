/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Function to get token dynamically
const getToken = () => localStorage.getItem("token");

// ✅ Include token in headers
export const getNotes = () =>
  API.get("/notes", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const createNote = (note: any) =>
  API.post("/notes", note, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const updateNote = (id: string, note: any) =>
  API.put(`/notes/${id}`, note, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const deleteNote = (id: string) =>
  API.delete(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5001/api", // Make sure this matches the new PORT
// });

// export const getNotes = () => API.get("/notes");
// export const createNote = (note: any) => API.post("/notes", note);
// export const updateNote = (id: string, note: any) => API.put(`/notes/${id}`, note);
// export const deleteNote = (id: string) => API.delete(`/notes/${id}`);

// export default API;