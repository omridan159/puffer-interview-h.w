// src/App.tsx
import React from "react";
import ConversionRateChart from "./components/ConversionRateChart";
import useStore from "./store";
import "./App.css";

const App: React.FC = () => {
  const clearConversionRates = useStore((state) => state.setConversionRates);

  const handleClear = () => {
    clearConversionRates(() => []);
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="App">
      <h1 className="App-header">pufETH Conversion Rate Tracker</h1>
      <ConversionRateChart />
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default App;
