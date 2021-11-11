import "./charts.styles.css";
import React, { useEffect, useRef, useContext } from "react";
//Context
import { WeatherContext } from "../../context/setContext";
//Charts Generation utils function
import { ChartsGeneration } from "../../utils/ChartsGeneration";

export interface DataType {
  date: any;
  value: any;
}

/**
 * @Component D3 Charts for Card Left Component
 * @returns D3 charts
 */
export const D3Charts = () => {
  const svgRef = useRef(null);
  const { mapped_current_weather } = useContext(WeatherContext);
  useEffect(() => {
    ChartsGeneration(svgRef, mapped_current_weather);
    const listener = window.addEventListener("resize", () =>
      ChartsGeneration(svgRef, mapped_current_weather)
    );
    return () => {
      window.removeEventListener("resize", () => listener);
    };
  }, [mapped_current_weather]);

  return (
    <>
      <div id="d3_container">
        <svg ref={svgRef} data-testid="d3_charts"></svg>
      </div>
      <div id="tooltip"></div>
    </>
  );
};
