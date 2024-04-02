// import { format } from "date-fns";
import CalendarControls from "./CalendarControls";
import CalendarGrid from "./CalendarGrid";

const Calendar = () => {
  return (
    <div>
      <CalendarControls />
      <CalendarGrid date={new Date()} />
    </div>
  );
};

export default Calendar;
