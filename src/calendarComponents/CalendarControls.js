import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CalendarControls = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={'"month" and "year"'}
        views={["month", "year"]}
        sx={{ width: "20%", marginTop: "15%", marginBottom: "0%" }}
      />
    </LocalizationProvider>
  );
};

export default CalendarControls;
