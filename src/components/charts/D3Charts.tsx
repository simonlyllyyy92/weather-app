import "./charts.styles.css";
import React, { useEffect, useRef, useContext } from "react";
import { WeatherContext } from "../../context/set_context";
import moment from "moment";
import * as d3 from "d3";

export interface DataType {
  date: any;
  value: any;
}

export const D3Charts = () => {
  const svgRef = useRef(null);
  const { forecast } = useContext(WeatherContext);
  const current_weather = forecast[0].hour;

  let mappedData: Array<DataType> = [];

  const mapData = () => {
    for (let i = 0; i < current_weather.length; i++) {
      mappedData.push({
        date: new Date(current_weather[i]?.time),
        value: current_weather[i]?.temp_c,
      });
    }
  };

  mapData();

  useEffect(() => {
    const svgWidth = 600,
      svgHeight = 400;
    const margin = { top: 28, right: 20, bottom: 30, left: 20 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const getDomain = (rows: any) => {
      const temp_val = rows
        .map(({ value }: { value: number }) => [value])
        .flat();
      // return [Math.min(...value), Math.max(...value)];
      return [Math.min(...temp_val), Math.max(...temp_val)];
    };
    const getTimeStampDomain = (rows: any) => {
      const value = rows.map(({ date }: { date: number }) => [date]).flat();
      return [Math.min(...value), Math.max(...value)];
    };
    const domain = getDomain(mappedData);
    const time_domain = getTimeStampDomain(mappedData);

    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // make sure each time the page reload the svg will be cleared
    svg.selectAll("*").remove();

    const axisWidth = width - 20;
    const axisHeight = height + 20;

    const xScale = d3.scaleTime().domain(time_domain).range([0, axisWidth]);

    const yScale = d3.scaleLinear().domain(domain).range([height, 0]);

    svg
      .append("g")
      .call(d3.axisBottom(xScale).tickSizeOuter(0).ticks(6))
      .attr("transform", `translate(-${axisWidth},${axisHeight})`)
      .attr("color", "#000")
      .transition()
      .duration(1000)
      .attr("transform", `translate(20,${axisHeight})`);

    svg
      .append("g")
      .call(d3.axisRight(yScale).tickSizeInner(2).tickSizeOuter(0).ticks(8))
      .attr("transform", `translate(${axisWidth + 20},-${axisHeight})`)
      .attr("color", "#000")
      .transition()
      .duration(1000)
      .attr("transform", `translate(${axisWidth + 20}, 20)`);
    svg
      .append("text")
      .attr("fill", "#3C4E76")
      .attr("transform", `translate(${width - 12}, 10)`)
      // .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Temperature (°C)");

    const areaGenerator = d3.area<DataType>().y0(height);

    areaGenerator
      .x(function (d, i) {
        return xScale(d.date);
      })
      .y1(function (d) {
        return yScale(d.value);
      });
    const area = areaGenerator(mappedData);

    svg
      .append("path")
      .attr("fill", "#3C4E76")
      .attr("stroke", "#999")
      .attr("transform", `translate(-${axisWidth},20)`)
      .transition()
      .duration(2000)
      .attr("transform", `translate(20,20)`)
      .attr("d", area);
  }, [forecast]);

  return (
    <>
      <div id="d3_container">
        <svg ref={svgRef}></svg>
      </div>
      <div id="tooltip"></div>
    </>
  );
};
