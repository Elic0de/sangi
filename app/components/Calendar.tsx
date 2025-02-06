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
  const [status,setstatus] = useState("input");

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="text-black bg-gray-100 flex items-center justify-center min-h-screen">
    <div>{

    status === "input" && (
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
            onClick={() => setstatus("close")}
          >
            {format(day, "d")}
          </div>
        )

        )}
      </div>
    </div>)}
    {status === "close" &&(
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">イベント入力</h2>
      <form>
          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">タイトル</label>
              <input type="text" id="title" name="title" className="mt-1 p-2 w-full border rounded-md" placeholder="タイトルを入力" />
          </div>
          <div className="mb-4">
              <label htmlFor="memo" className="block text-sm font-medium text-gray-700">メモ</label>
              <textarea id="memo" name="memo" className="mt-1 p-2 w-full border rounded-md" placeholder="メモを入力"></textarea>
          </div>
          <div className="mb-4 flex items-center">
              <input type="checkbox" id="allday" name="allday" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label className="ml-2 text-sm font-medium text-gray-700">終日</label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">保存</button>
      </form>
  </div>
    )}
    
    
    
    
    </div>
    
      </div>
  );
};

export default Calendar;
