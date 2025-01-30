"use client";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

const touchHandler = (event: any) => {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
};
document.addEventListener('touchstart', touchHandler, {
  passive: false
});

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="w-[375px] mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
          className="p-2 bg-gray-200 rounded"
        >
          ◀
        </button>
        <h2 className="text-lg font-bold">{format(currentMonth, "yyyy年 MM月")}</h2>
        <button
          onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
          className="p-2 bg-gray-200 rounded"
        >
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-gray-600">
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <div key={d} className="p-2 font-bold">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-2 border ${isSameMonth(day, currentMonth) ? "text-black" : "text-gray-400"} 
                ${isSameDay(day, selectedDate) ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
            onClick={() => setSelectedDate(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
