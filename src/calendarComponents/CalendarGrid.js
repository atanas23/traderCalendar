import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";
import "./calendarGrid.css";
import { useSelector } from "react-redux";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//get the number of days in previous month - Fill component
const numOfDaysInPrevMonth = (year, month) =>
  new Date(year, month, 0).getDate();

const fillPrevMonth = (year, month, startingDayIndex) => {
  let prevMonthDays = numOfDaysInPrevMonth(year, month) - startingDayIndex;
  const fillerDays = Array.from({ length: startingDayIndex }).map(
    (day, index) => {
      day = prevMonthDays += 1;
      return (
        <div
          key={`padding-end-${index}`}
          className="allGridDays notCurrentMonth"
        >
          {day}
        </div>
      );
    }
  );
  return fillerDays;
};

const fillNextMonth = (endingDayIndex) => {
  const fillerDays = Array.from({ length: 6 - endingDayIndex }).map(
    (day, index) => {
      day = index + 1;
      return (
        <div
          key={`padding-start-${index}`}
          className="allGridDays notCurrentMonth"
        >
          {day}
        </div>
      );
    }
  );
  return fillerDays;
};

const CalendarGrid = () => {
  //new Date and check store in !null
  // TODO: func to return an object with all of these
  const storeyDate = useSelector((state) => state.date.date);
  const displayDate = new Date(storeyDate);

  const firstDayOfMonth = startOfMonth(displayDate);
  const lastDayOfMonth = endOfMonth(displayDate);
  //   add ID or use the start day
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  //get the index of the first day of the month(0-6 for mon-sun)
  const startingDayIndex = getDay(firstDayOfMonth) - 1;
  const endingDayIndex = getDay(lastDayOfMonth) - 1;
  return (
    <div>
      <div className="calendarGrid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="weekdays">
            {day}
          </div>
        ))}
        {/* add filler days before the first day of the month - possibly in a new component */}
        {fillPrevMonth(
          displayDate.getFullYear(),
          displayDate.getMonth(),
          startingDayIndex
        )}

        {daysInMonth.map((day, index) =>
          displayDate.getDate() === day.getDate() ? (
            <div key={index} className="allGridDays daysGridToday">
              {format(day, "d")}
            </div>
          ) : (
            <div key={index} className="allGridDays">
              {format(day, "d")}
            </div>
          )
        )}

        {fillNextMonth(endingDayIndex)}
      </div>
    </div>
  );
};

export default CalendarGrid;
