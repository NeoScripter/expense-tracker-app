import { useState } from "react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns"

export function DatePicker({ value, onChange, label = "Select a date" }) {
  return (
    <div className="inline-block mt-4">
      <div className="mb-4 text-sm flex items-center justify-between">
          <div>
            {value == null ? label : format(value, "MMM do, yyyy")}
          </div>
          <button onClick={() => onChange(null)} className="cursor-pointer">Reset</button>
      </div>
      <DatePickerModal onChange={onChange} value={value}/>
    </div>
  )
}

function DatePickerModal({ value, onChange }) {
  const [visibleMonth, setVisibleMonth] = useState(value || new Date())

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  })

  function showPreviousMonth() {
    setVisibleMonth(currentMonth => {
      return addMonths(currentMonth, -1)
    })
  }

  function showNextMonth() {
    setVisibleMonth(currentMonth => {
      return addMonths(currentMonth, 1)
    })
  }

  return (
    <div className="p-2 shadow-md">
      <div className="flex items-center justify-between font-bold text-sm md:text-base px-2">
        <button
          className="cursor-pointer"
          onClick={showPreviousMonth}
        >
          &larr;
        </button>
        <div className="current-month">
          {format(visibleMonth, "MMMM - yyyy")}
        </div>
        <button
          className="cursor-pointer"
          onClick={showNextMonth}
        >
          &rarr;
        </button>
      </div>
      <div className="grid grid-cols-7 mb-2 mt-4 text-sm text-center md:text-base">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="grid grid-cols-7 grid-rows-6 text-sm text-center md:text-base">
        {visibleDates.map(date => (
          <button
            onClick={() => onChange(date)}
            className={`aspect-square cursor-pointer ${
              !isSameMonth(date, visibleMonth) && "text-gray-400"
            } ${isSameDay(date, value) && "bg-primary-blue rounded-full text-white"} ${
              isToday(date) && "today"
            }`}
            key={date.toDateString()}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  )
}