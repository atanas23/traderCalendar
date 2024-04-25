import Calendar from "./calendarComponents/Calendar";
import NavBar from "./navigationBar/navBar";
import "./App.css";
import SignUpComponent from "./navigationBar/userComponents/SignUpComponent";

const App = () => {
  return (
    <div>
      <h1>
        <NavBar />
      </h1>
      <div className="App">
        <Calendar />
      </div>
    </div>
  );
};

export default App;
