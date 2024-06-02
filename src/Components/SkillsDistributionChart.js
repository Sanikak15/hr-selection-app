import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SkillsDistributionChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.count);

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3
      .arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const arc = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.skill));

    arc
      .append("text")
      .attr("transform", (d) => `translate(${label.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data.skill);
  }, [data]);

  return <svg ref={ref} width={500} height={300}></svg>;
};

export default SkillsDistributionChart;
