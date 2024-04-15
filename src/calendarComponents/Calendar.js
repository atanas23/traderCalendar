// import { format } from "date-fns";
import CalendarControls from "./CalendarControls";
import CalendarGrid from "./CalendarGrid";
import Container from "@mui/material/Container";

const Calendar = () => {
  return (
    <Container>
      <CalendarControls />
      <CalendarGrid date={new Date()} />
    </Container>
  );
};

export default Calendar;
