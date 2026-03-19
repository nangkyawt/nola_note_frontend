/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, type JSX } from "react";
import type { Note } from "../types";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parseISO,
  addMonths,
  subMonths,
} from "date-fns";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

interface CalendarPageProps {
  notes: Note[];
  onAddNoteWithDate: (date: string) => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ notes, onAddNoteWithDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateCalendar = () => {
    const rows = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const notesOnDay = notes.filter(
          (note) => isSameDay(parseISO(note.createdAt), day)
        );
        const hasPinned = notesOnDay.some((note) => note.pinned);

        days.push(
          <div
            key={day.toString()}
            onClick={() => onAddNoteWithDate(format(day, "yyyy-MM-dd"))}
            className={`
              flex flex-col justify-start p-1 rounded-lg cursor-pointer
              transition-transform duration-150
              border border-gray-200
              ${!isSameMonth(day, monthStart) ? "text-gray-300 bg-gray-50" : "text-gray-700 bg-white"}
              ${isSameDay(day, new Date()) ? "ring-2 ring-pink-400" : ""}
              hover:shadow-lg hover:scale-105
              min-h-[60px] md:min-h-[80px]
            `}
          >
            {/* Date */}
            <div className="flex justify-between items-center mb-1 px-1">
              <span className="font-semibold text-pink-600 text-xs md:text-sm">{format(day, "d")}</span>
              {notesOnDay.length > 0 && (
                <span
                  className={`text-[8px] md:text-[10px] px-1 py-0.5 rounded-full font-medium ${
                    hasPinned ? "bg-rose-300 text-rose-700" : "bg-pink-200 text-pink-700"
                  }`}
                  title={`${notesOnDay.length} note${notesOnDay.length > 1 ? "s" : ""}`}
                >
                  {notesOnDay.length}
                </span>
              )}
            </div>

            {/* Notes preview */}
            <div className="flex flex-col gap-0.5 px-1 overflow-hidden text-[8px] md:text-[9px]">
              {notesOnDay.slice(0, 2).map((note) => (
                <div
                  key={note._id}
                  className={`truncate px-1 py-0.5 rounded text-white ${
                    note.pinned ? "bg-rose-500" : "bg-pink-400"
                  }`}
                  title={note.title}
                >
                  {note.title}
                </div>
              ))}
              {notesOnDay.length > 2 && (
                <span className="text-[7px] md:text-[8px] text-gray-400">
                  +{notesOnDay.length - 2} more
                </span>
              )}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-1 mb-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return rows;
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Back & Month Navigation */}
<div className="flex justify-between items-start mb-4">
  {/* Back button top-left */}
  <button
    onClick={() => navigate("/notes")}
    className="flex items-center gap-1 px-3 py-1 bg-pink-200 hover:bg-pink-300 text-pink-800 font-semibold rounded-full shadow-sm transition text-sm"
  >
    <ArrowLeftIcon className="w-4 h-4" /> Back
  </button>

  {/* Month navigation centered */}
  <div className="flex flex-col items-center w-full">
    <div className="flex items-center gap-2 mb-2">
      <button
        onClick={handlePrevMonth}
        className="px-2 py-1 bg-pink-100 rounded-full hover:bg-pink-200 transition text-sm font-semibold text-pink-700"
      >
        &lt;
      </button>

      <h2 className="text-lg font-bold text-pink-600">{format(monthStart, "MMMM yyyy")}</h2>

      <button
        onClick={handleNextMonth}
        className="px-2 py-1 bg-pink-100 rounded-full hover:bg-pink-200 transition text-sm font-semibold text-pink-700"
      >
        &gt;
      </button>
    </div>

    {/* Add Note button below month title */}
    <button
      onClick={() => onAddNoteWithDate(format(new Date(), "yyyy-MM-dd"))}
      className="px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-semibold rounded-full shadow-sm text-sm"
    >
      + Add Note
    </button>
  </div>
</div>

      {/* Weekdays */}
<div className="max-w-3xl mx-auto grid grid-cols-7 gap-1 text-center font-semibold text-pink-500 mb-2">
  {weekDays.map((day) => (
    <div
      key={day}
      className="flex justify-center items-center text-[10px] md:text-sm py-1"
    >
      {day}
    </div>
  ))}
</div>
      {/* Calendar Grid */}
      <div className="max-w-3xl mx-auto">{generateCalendar()}</div>
    </div>
  );
};

export default CalendarPage;