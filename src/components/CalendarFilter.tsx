/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

interface CalendarFilterProps {
  onAddNoteWithDate: (date: string) => void;
}

const CalendarFilter: React.FC<CalendarFilterProps> = ({ onAddNoteWithDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleAddNote = () => {
    if (!selectedDate) return;
    onAddNoteWithDate(selectedDate);
    setShowCalendar(false);
    setSelectedDate("");
  };

  return (
    <div className="relative inline-block ml-4">
      {/* Calendar Button */}
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="px-3 py-1 text-sm bg-white/30 backdrop-blur-lg border border-white/40 rounded-full text-pink-600 hover:bg-white/50 transition shadow-sm"
      >
        📅 Calendar
      </button>

      {/* Calendar Popover */}
      {showCalendar && (
        <div
          className="fixed top-32 left-1/2 -translate-x-1/2 p-4 w-64 bg-white/40 backdrop-blur-md rounded-xl shadow-lg z-[9999] flex flex-col gap-2"
        >
          <label className="text-gray-600 text-sm font-medium">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateSelect}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleAddNote}
            className="mt-2 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
          >
            Add Note
          </button>
          <button
            onClick={() => setShowCalendar(false)}
            className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarFilter;