import * as d3 from "d3";

//Type from context
import { DataType } from "../context/set_context";

/**
 * @Function This is a similar charts generate function But for testing purposes
 * @param mappedData  Data from Mock Service work will be passed in
 */

export const chartsGenerate = (mappedData: DataType[]) => {
  /**
   * For testing purposes we set up fix width and height here
   */
  const currentWidth = 600;
  const currentHeight = 400;

  //Setting default svg height and width
  const margin = { top: 28, right: 20, bottom: 30, left: 20 };
  const width = currentWidth - margin.left - margin.right;
  const height = currentHeight - margin.top - margin.bottom;
  /**
   * @return Maximum temperature value and Minimum temperature value
   */
  const getDomain = (rows: any) => {
    const temp_val = rows.map(({ value }: { value: number }) => [value]).flat();
    return [Math.min(...temp_val), Math.max(...temp_val)];
  };
  /**
   * @return  Maximum date value and Minimum Date Value
   */

  const getTimeStampDomain = (rows: any) => {
    const value = rows.map(({ date }: { date: number }) => [date]).flat();
    return [Math.min(...value), Math.max(...value)];
  };

  //Get the domain value for date and temperature
  const domain = getDomain(mappedData);
  const time_domain = getTimeStampDomain(mappedData);

  //Set up svg image height and width
  const svg = d3
    .select("#d3_container")
    .append("svg")
    .attr("width", currentWidth)
    .attr("height", currentHeight);

  // Make sure each time the page reload, the svg will be cleared !important
  svg.selectAll("*").remove();

  /**
   * Adjust the axis position
   * As some of the label on the axies might not be displayed properly
   */
  const axisWidth = width - 20;
  const axisHeight = height + 20;

  //Set up d3 scale function
  const xScale = d3.scaleTime().domain(time_domain).range([0, axisWidth]);
  const yScale = d3.scaleLinear().domain(domain).range([height, 0]);

  //Generate Axis X
  svg
    .append("g")
    .call(d3.axisBottom(xScale).tickSizeOuter(0).ticks(6))
    .attr("color", "#000")
    .attr("transform", `translate(20,${axisHeight})`);
  //Generate Axis Y
  svg
    .append("g")
    .call(d3.axisRight(yScale).tickSizeInner(2).tickSizeOuter(0).ticks(8))
    .attr("color", "#000")
    .attr("transform", `translate(${axisWidth + 20}, 20)`);
  //Generate Text hint
  svg
    .append("text")
    .attr("fill", "#3C4E76")
    .attr("transform", `translate(${width - 12}, 10)`)
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Temperature (°C)");

  // Draw area
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
    .attr("transform", `translate(20,20)`)
    .attr("d", area);

  return svg;
};
