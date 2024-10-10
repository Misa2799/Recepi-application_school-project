// components/ui/calendar.tsx

import { addMonths, format, subMonths } from "date-fns";
import React from "react";

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  mode?: "single" | "multiple" | "range";
  initialFocus?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const days = Array.from({ length: 42 }).map((_, index) => {
    const day = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      index - currentMonth.getDate() + 1
    );
    return day;
  });

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h2 className="text-lg font-bold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={handleNextMonth}>{">"}</button>
      </header>
      <div className="grid grid-cols-7 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toString()}
            className={`p-2 cursor-pointer ${
              day.getMonth() !== currentMonth.getMonth() ? "text-gray-400" : ""
            }`}
            onClick={() => {
              if (day.getMonth() === currentMonth.getMonth()) {
                onSelect(day);
              }
            }}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Calendar };
