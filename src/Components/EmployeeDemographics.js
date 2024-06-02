import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const EmployeeDemographics = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = pie(data);
    console.log("s", arcs);
    svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .attr("fill", (d, i) => color(i))
      .attr("d", arc);
  }, [data]);

  return (
    <svg ref={svgRef} key={JSON.stringify(data)} width={400} height={400}>
      {/* SVG container */}
    </svg>
  );
};

export default EmployeeDemographics;
