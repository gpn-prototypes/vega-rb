import React, { useRef, useEffect, useCallback } from 'react'
import * as d3 from 'd3'
import style from './DistributionChart.module.css'
import './DistributionChart.css'

const height = 188
const width = 400

interface Point {
    x: number
    y: number
}

interface Props {
    cumulative: Point[]
    probabilityDensity: Point[]
    percentPoints: Point[]
}

const DistributionChart: React.FC<Props> = ({
    probabilityDensity,
    cumulative,
    percentPoints,
}) => {
    const margin = { top: 10, right: 10, bottom: 10, left: 10 }

    const getX = (d: Point) => d.x
    const getY = (d: Point) => d.y

    const d3Container = useRef(null)
    const createXScale = useCallback(
        (domain: Array<number | { valueOf(): number }>) =>
            d3
                .scaleLinear()
                .domain(domain)
                .range([margin.left, width - margin.right]),
        [margin.left, margin.right]
    )
    const createYScale = useCallback(
        (domain: Array<number | { valueOf(): number }>) =>
            d3
                .scaleLinear()
                .domain(domain)
                .range([height - margin.bottom, margin.top]),
        [margin.bottom, margin.top]
    )

    const draw = useCallback(() => {
        const svg = d3.select(d3Container.current)
        svg.selectAll('*').remove()

        const cumulativeXScale = createXScale([
            d3.min(cumulative, getX) as number,
            d3.max(cumulative, getX) as number,
        ])
        const cumulativeYScale = createYScale([
            d3.min(cumulative, getY) as number,
            d3.max(cumulative, getY) as number,
        ])
        const probabilityDensityXScale = createXScale([
            d3.min(probabilityDensity, getX) as number,
            d3.max(probabilityDensity, getX) as number,
        ])
        const probabilityDensityYScale = createYScale([
            d3.min(probabilityDensity, getY) as number,
            d3.max(probabilityDensity, getY) as number,
        ])

        const xAxis = (g: any) =>
            g
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .attr('class', 'grid')
                .call(
                    d3
                        .axisBottom(probabilityDensityXScale)
                        .ticks(width / 50)
                        .tickSize(-height)
                        .tickSizeOuter(0)
                )
        const yAxis = (g: any) =>
            g
                .attr('transform', `translate(${margin.left},0)`)
                .attr('class', 'grid')
                .call(
                    d3
                        .axisLeft(probabilityDensityYScale)
                        .ticks(height / 70)
                        .tickSize(-width)
                        .tickFormat(() => '')
                )

        svg.append('g').call(xAxis)
        svg.append('g').call(yAxis)

        const area = d3
            .area<Point>()
            .x((d) => probabilityDensityXScale(getX(d)))
            .y0(height)
            .y1((d) => probabilityDensityYScale(getY(d)))

        const graphArea = svg.append('g')
        const defs = svg.append('defs')

        const bgGradient = defs
            .append('linearGradient')
            .attr('id', `main-content-bg-gradient`)
            .attr('gradientTransform', 'rotate(90)')

        bgGradient
            .append('stop')
            .attr('stop-color', 'rgba(41, 176, 255, 0.4)')
            .attr('offset', '0%')
        bgGradient
            .append('stop')
            .attr('stop-color', 'rgba(41, 176, 255, 0)')
            .attr('offset', '100%')

        defs.append('clipPath')
            .attr('id', `main-content-clip-line-path`)
            .append('path')
            .attr('d', area(probabilityDensity) as string)
            .attr('class', 'value-line')

        const clipPath = graphArea
            .append('g')
            .attr('clip-path', `url(#main-content-clip-line-path)`)

        clipPath
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'url(#main-content-bg-gradient)')

        graphArea
            .append('path')
            .datum(probabilityDensity)
            .attr('fill', 'none')
            .attr('stroke', '#56B9F2')
            .call((g) =>
                g
                    .selectAll('.tick:not(:first-of-type) line')
                    .attr('stroke-opacity', 0.5)
                    .attr('stroke-dasharray', '2,2')
            )
            .attr('stroke-width', 2)
            .attr(
                'd',
                d3
                    .line<Point>()
                    //@ts-ignore
                    .x((d) => probabilityDensityXScale(getX(d)))
                    .y((d) => probabilityDensityYScale(getY(d)))
            )
        graphArea
            .append('path')
            .datum(cumulative)
            .attr('fill', 'none')
            .attr('stroke', '#56B9F2')
            .attr('stroke-width', 2)
            .attr(
                'd',
                d3
                    .line<Point>()
                    .x((d) => cumulativeXScale(getX(d)))
                    .y((d) => cumulativeYScale(getY(d)))
            )
        svg.selectAll('points')
            .data(percentPoints)
            .enter()
            .append('circle')
            .attr('fill', '#fff')
            .attr('stroke', 'none')
            .attr('cx', (d) => cumulativeXScale(getX(d)))
            .attr('cy', (d) => cumulativeYScale(getY(d)))
            .attr('r', 3)
    }, [
        createXScale,
        cumulative,
        createYScale,
        probabilityDensity,
        percentPoints,
        margin.bottom,
        margin.left,
    ])

    useEffect(() => {
        if (d3Container.current) {
            draw()
        }
    }, [probabilityDensity, cumulative, percentPoints, draw])

    return (
        <div className={style.Chart}>
            <svg width={width} height={height} ref={d3Container} />
        </div>
    )
}

export default DistributionChart
