import React, { useCallback, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { cnDistributionChart } from './cn-distribution-chart';
import { Data, Point } from './types';

import './DistributionChart.css';

const height = 224;
const width = 400;
const margin = { top: 18, right: 20, bottom: 28, left: 45 };

interface DistributionChartProps {
  data: Data;
}

const DistributionChart: React.FC<DistributionChartProps> = ({
  data: { pdf, sf, percentiles },
}) => {
  const getX = (d: Point) => d.x;
  const getY = (d: Point) => d.y;

  const d3Container = useRef(null);
  const getScale = (
    domain: number[] | { valueOf(): number }[],
    position: number[],
  ) => d3.scaleLinear().domain(domain).nice().range(position);
  const xScalePosition = [margin.left, width - margin.right];
  const yScalePosition = [height - margin.bottom, margin.top];
  const getDomain = (points: Point[], func: (d: Point) => number) => [
    d3.min(points, func) as number,
    d3.max(points, func) as number,
  ];
  const draw = useCallback(() => {
    const svg = d3.select(d3Container.current);

    svg.selectAll('*').remove();

    const cumulativeXScale = getScale(getDomain(sf, getX), xScalePosition);
    const cumulativeYScale = getScale(getDomain(sf, getY), yScalePosition);
    const probabilityDensityXScale = getScale(
      getDomain(pdf, getX),
      xScalePosition,
    );
    const probabilityDensityYScale = getScale(
      getDomain(pdf, getY),
      yScalePosition,
    );
    const projectionLinesFromPoint = (point: Point, data: Point[]) => {
      svg
        .append('path')
        .datum([
          { x: d3.min(data, getX) as number, y: point.y },
          point,
          { x: point.x, y: d3.min(data, getY) as number },
        ])
        .attr('class', cnDistributionChart('ProjectionLines'))
        .attr(
          'd',
          d3
            .line<Point>()
            .x((d) => cumulativeXScale(getX(d)) as number)
            .y((d) => cumulativeYScale(getY(d)) as number),
        );
    };

    svg.append('g').call((g) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .attr('class', cnDistributionChart('Axis'))
        .call(
          d3
            .axisBottom(probabilityDensityXScale)
            .ticks(width / 80)
            .tickSize(4)
            .tickFormat(() => ''),
        ),
    );

    svg.append('g').call((g) =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .attr('class', cnDistributionChart('Grid'))
        .call(
          d3.axisBottom(probabilityDensityXScale).ticks(5).tickSize(-height),
        ),
    );

    svg.append('g').call((g) =>
      g
        .attr('transform', `translate(${margin.left},0)`)
        .attr('class', cnDistributionChart('Axis', { position: 'left' }))
        .call(
          d3
            .axisLeft(cumulativeYScale)
            .ticks(width / 80)
            .tickSize(4)
            .tickFormat((domainValue) => `${domainValue}`),
        ),
    );

    if (percentiles.length) {
      svg
        .selectAll('points')
        .data(percentiles.map(({ point }) => point))
        .enter()
        .append('text')
        .text((d) => `${Number.parseFloat(getX(d).toFixed(3))}`)
        .attr('class', cnDistributionChart('Percentiles', 'Text'))
        .attr('x', (d) => cumulativeXScale(getX(d)) as number)
        .attr('y', (d) => cumulativeYScale(getY(d)) as number)
        .attr('transform', `translate(5, 0)`);

      percentiles.forEach((percentile) => {
        projectionLinesFromPoint(percentile.point, sf);
      });
    }

    const area = d3
      .area<Point>()
      .x((d) => probabilityDensityXScale(getX(d)) as number)
      .y0(height)
      .y1((d) => probabilityDensityYScale(getY(d)) as number);

    const graphArea = svg.append('g');
    const defs = svg.append('defs');

    const bgGradient = defs
      .append('linearGradient')
      .attr('id', `main-content-bg-gradient`)
      .attr('gradientTransform', 'rotate(90)');

    bgGradient
      .append('stop')
      .attr('stop-color', 'rgba(41, 176, 255, 0.4)')
      .attr('offset', '0%');
    bgGradient
      .append('stop')
      .attr('stop-color', 'rgba(64,112,140,0)')
      .attr('offset', '100%');

    defs
      .append('clipPath')
      .attr('id', `main-content-clip-line-path`)
      .append('path')
      .attr('d', area(pdf) as string)
      .attr('class', 'value-line');

    const clipPath = graphArea
      .append('g')
      .attr('clip-path', `url(#main-content-clip-line-path)`);

    clipPath
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'url(#main-content-bg-gradient)');

    graphArea
      .append('path')
      .datum(pdf)
      .attr('fill', 'none')
      .attr('stroke', '#0AA5FF')
      .call((g) =>
        g
          .selectAll('.tick:not(:first-of-type) line')
          .attr('stroke-opacity', 0.5)
          .attr('stroke-dasharray', '2,2'),
      )
      .attr('stroke-width', 2)
      .attr(
        'd',
        d3
          .line<Point>()
          .x((d) => probabilityDensityXScale(getX(d)) as number)
          .y((d) => probabilityDensityYScale(getY(d)) as number),
      );
    graphArea
      .append('path')
      .datum(sf)
      .attr('fill', 'none')
      .attr('stroke', '#F38B00')
      .attr('stroke-width', 2)
      .attr(
        'd',
        d3
          .line<Point>()
          .x((d) => cumulativeXScale(getX(d)) as number)
          .y((d) => cumulativeYScale(getY(d)) as number),
      );
  }, [sf, xScalePosition, yScalePosition, pdf, percentiles]);

  useEffect(() => {
    if (d3Container.current) {
      draw();
    }
  }, [draw]);

  return (
    <div className={cnDistributionChart()}>
      <svg width={width} height={height} ref={d3Container} />
    </div>
  );
};

export default DistributionChart;
