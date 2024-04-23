import { eachDayOfInterval, format } from "date-fns";
import "./calendarGrid.css";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const testPnL = [
  { date: new Date(2023, 10, 1).toISOString(), pnl: 1176 },
  { date: new Date(2023, 10, 2).toISOString(), pnl: 805 },
  { date: new Date(2023, 10, 3).toISOString(), pnl: 183 },
  { date: new Date(2023, 10, 6).toISOString(), pnl: -660 },
  { date: new Date(2023, 10, 7).toISOString(), pnl: 276 },
  { date: new Date(2023, 10, 8).toISOString(), pnl: -570 },
  { date: new Date(2023, 10, 9).toISOString(), pnl: 93 },
  { date: new Date(2023, 10, 10).toISOString(), pnl: 610 },
  { date: new Date(2023, 10, 13).toISOString(), pnl: -153 },
  { date: new Date(2023, 10, 14).toISOString(), pnl: -851 },
  { date: new Date(2023, 10, 15).toISOString(), pnl: -10 },
  { date: new Date(2023, 10, 16).toISOString(), pnl: 132 },
  { date: new Date(2023, 10, 17).toISOString(), pnl: 101 },
  { date: new Date(2023, 10, 20).toISOString(), pnl: -439 },
  { date: new Date(2023, 10, 21).toISOString(), pnl: 86 },
  { date: new Date(2023, 10, 27).toISOString(), pnl: 0 },
  { date: new Date(2023, 10, 28).toISOString(), pnl: 106 },
  { date: new Date(2023, 10, 29).toISOString(), pnl: 304 },
  { date: new Date(2023, 10, 30).toISOString(), pnl: 1869 },
];

const getRelevantDates = (date) => {
  const displayDate = new Date(date);
  const firstDayOfMonth = new Date(
    displayDate.getUTCFullYear(),
    displayDate.getUTCMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    displayDate.getUTCFullYear(),
    displayDate.getUTCMonth() + 1,
    0
  );
  //rename to firstAndLastDayOfMonth
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });
  //get the index of the first day of the month(0-6 for mon-sun)
  const startingDayIndex = firstDayOfMonth.getUTCDay();
  const endingDayIndex = lastDayOfMonth.getUTCDay();

  return {
    displayDate,
    firstDayOfMonth,
    lastDayOfMonth,
    daysInMonth,
    startingDayIndex,
    endingDayIndex,
  };
};

const calcFillerDays = (relevantDates) => {
  const prevMonthDays = new Date(
    relevantDates.displayDate.getUTCFullYear(),
    relevantDates.displayDate.getUTCMonth(),
    0
  ).getUTCDate();

  const prevMonthFiller = Array(relevantDates.startingDayIndex)
    .fill()
    .map((_, i) => i + (prevMonthDays - relevantDates.startingDayIndex));

  const nextMonthFill = Array(6 - relevantDates.endingDayIndex)
    .fill()
    .map((_, i) => i + 1);

  return {
    prevMonthFiller,
    nextMonthFiller: nextMonthFill ? nextMonthFill : 6,
  };
};

const renderFillerMonth = (days, keyIndex) =>
  days.map((day) => (
    <Box key={`${keyIndex}-${day}`} className="allGridDays notCurrentMonth">
      {day}
    </Box>
  ));
//TODO: add dates with no trading data instead(refactoring)
//TODO: fix $0 not being shown because of ?.
const generateTradingDays = (dates, data) => {
  let pnl;
  return dates[0].getFullYear() === new Date(data[0].date).getFullYear() &&
    dates[0].getMonth() === new Date(data[0].date).getMonth()
    ? dates.map((day, index) => {
        pnl = data.find((el) => el.date === day.toISOString())?.pnl;
        return (
          <Box key={index} className="allGridDays">
            {format(new Date(day), "d")}
            <Box>{pnl ? pnl + "$" : ""}</Box>
          </Box>
        );
      })
    : dates.map((day, index) => {
        return (
          <Box key={index} className="allGridDays">
            {format(day, "d")}
          </Box>
        );
      });
};

const CalendarGrid = () => {
  const storeDate = useSelector((state) => state.tradingDate.date);
  const relevantDates = getRelevantDates(storeDate);
  const fillerMonthDays = calcFillerDays(relevantDates);

  return (
    <Box className="calendarGrid">
      {WEEKDAYS.map((day) => (
        <Box key={day} className="weekdays" sx={{ border: "1px solid" }}>
          {day}
        </Box>
      ))}
      {renderFillerMonth(fillerMonthDays.prevMonthFiller, "previous-month")}
      {generateTradingDays(relevantDates.daysInMonth, testPnL)}
      {renderFillerMonth(fillerMonthDays.nextMonthFiller, "next-month")}
    </Box>
  );
};

export default CalendarGrid;
