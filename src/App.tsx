import React from "react";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { D3Charts } from "./components/charts/D3Charts";
import { WeatherContextProvider } from "./context/set_context";

function App() {
  return (
    <div className="app">
      <WeatherContextProvider>
        <Dashboard />
      </WeatherContextProvider>
    </div>
    // <D3Charts />
  );
}

export default App;
