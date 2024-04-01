import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";
import "./calendarGrid.css";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//get the number of days in previous month - Fill component
const numbOfDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const CalendarGrid = () => {
  // TODO: func to return an object with all of these
  const currentDate = new Date(2024, 1);
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  console.log();

  //   add ID or use the start day
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  //get the index of the first day of the month(0-6 for mon-sun)
  const startingDayIndex = getDay(firstDayOfMonth) - 1;
  return (
    <div>
      <div>
        <h2> {format(currentDate, "MMMM yyyy")}</h2>
      </div>
      <div className="calendarGrid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="weekdays">
            {day}
          </div>
        ))}
        {/* add filler days before the first day of the month - possibly in a new component */}
        {/* <Fill start /> */}

        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`padding-${index}`} className="allGridDays" />;
        })}

        {daysInMonth.map((day, index) =>
          currentDate.getDate() === day.getDate() ? (
            <div key={index} className="allGridDays daysGridToday">
              {format(day, "d")}
            </div>
          ) : (
            <div key={index} className="allGridDays">
              {format(day, "d")}
            </div>
          )
        )}
        {/* <Fill end /> */}
      </div>
    </div>
  );
};

export default CalendarGrid;
