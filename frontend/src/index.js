import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import calendarStore from "./store/calendarStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StatsComponent from "./navigationBar/statisticsComponent/StatisticsComponent";
import MarketComponent from "./navigationBar/marketsComponent/MarketComponent";
import SignUpComponent from "./navigationBar/userComponents/SignUpComponent";
import SignInComponent from "./navigationBar/userComponents/SingInComponent";

const router = createBrowserRouter([
  { path: "/", element: <App /> }, //was <App /><SignUpComponent />
  { path: "/signup", element: <SignUpComponent /> }, //was <App /><SignUpComponent />
  { path: "/signin", element: <SignInComponent /> }, //was <App /><SignUpComponent />
  { path: "/statistics", element: <StatsComponent /> },
  { path: "/markets", element: <MarketComponent /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={calendarStore}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
