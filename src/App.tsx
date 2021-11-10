import React from "react";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { WeatherContextProvider } from "./context/set_context";

function App() {
  return (
    <div className="app">
      <WeatherContextProvider>
        <Dashboard />
      </WeatherContextProvider>
    </div>
  );
}

export default App;
