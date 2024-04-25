import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { dateActions } from "../store/calendarStore";
import { useDispatch } from "react-redux"; //this is for calendarGrid

const CalendarControls = () => {
  const dispatch = useDispatch();
  const dateChangeHandler = (event) => {
    dispatch(dateActions.dateChange(event.$d.toISOString()));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onYearChange={dateChangeHandler}
        label={'"month" and "year"'}
        views={["month", "year"]}
        sx={{ width: "20%", marginTop: "15%", marginBottom: "0%" }}
      />
    </LocalizationProvider>
  );
};

export default CalendarControls;
