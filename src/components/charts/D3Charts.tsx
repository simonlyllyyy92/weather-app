import "./charts.styles.css";
import React, { useEffect, useRef, useContext } from "react";
//Context
import { WeatherContext } from "../../context/set_context";
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
  }, [mapped_current_weather]);

  return (
    <>
      <div id="d3_container">
        <svg ref={svgRef}></svg>
      </div>
      <div id="tooltip"></div>
    </>
  );
};
