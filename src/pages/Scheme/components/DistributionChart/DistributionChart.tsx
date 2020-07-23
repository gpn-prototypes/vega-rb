import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import style from './style.module.css'
import './DistributionChart.css'

const height = 188
const width = 400

function Random_normal_Dist(mean: number, sd: number) {
    const data = [] as { q: number; p: number }[]
    for (let i = mean - 4 * sd; i < mean + 4 * sd; i += 1) {
        const q = i
        //@ts-ignore
        const p = jStat.normal.pdf(i, mean, sd) as number
        const arr = {
            q,
            p,
        }
        data.push(arr)
    }
    return data
}

interface Data {
    x: number
    y: number
}
// const array1 = Random_normal_Dist(30, 15) as Data[]
// const array2 = Random_normal_Dist(-16, 22) as Data[]

interface Props {
    data: Data[]
}

const DistributionChart: React.FC<Props> = ({ data }) => {
    const d3Container = useRef(null)

    useEffect(() => {
        if (d3Container.current) {
            const margin = { top: 20, right: 30, bottom: 30, left: 40 }
            const svg = d3.select(d3Container.current)

            svg.selectAll('*').remove()

            const getX = (d: Data) => d.x
            const getY = (d: Data) => d.y

            const x = d3
                .scaleLinear()
                .domain([
                    d3.min(data, getX) as number,
                    d3.max(data, getX) as number,
                ])
                .range([margin.left, width - margin.right])

            const y = d3
                .scaleLinear()
                .domain([
                    d3.min(data, getY) as number,
                    d3.max(data, getY) as number,
                ])
                .range([height - margin.bottom, margin.top])

            svg.append('svg').attr('width', 1440).attr('height', 30)

            const xAxis = (g: any) =>
                g
                    .attr('transform', `translate(0,${height - margin.bottom})`)
                    .attr('class', 'grid')
                    .call(
                        d3
                            .axisBottom(x)
                            .ticks(width / 50)
                            .tickSize(-height)
                            .tickSizeOuter(0)
                            .tickFormat(() => '')
                    )
            const yAxis = (g: any) =>
                g
                    .attr('transform', `translate(${margin.left},0)`)
                    .attr('class', 'grid')
                    .call(
                        d3
                            .axisLeft(y)
                            .ticks(height / 70)
                            .tickSize(-width)
                            .tickFormat(() => '')
                    )
                    .call((g: any) => g.select('.domain').remove())
                    .call((g: any) =>
                        g
                            .select('.tick:last-of-type text')
                            .clone()
                            .attr('x', 3)
                            .attr('text-anchor', 'start')
                            .attr('font-weight', 'bold')
                            // @ts-ignore
                            .text(data.y)
                    )
            svg.append('g').call(xAxis)
            svg.append('g').call(yAxis)

            const area = d3
                .area()
                //@ts-ignore
                // .defined((d) => !isNaN(d.upper))
                .x((d: Data) => x(getX(d)))
                .y0(height)
                .y1((d: Data) => y(getY(d)))

            const line = d3
                .line()
                //@ts-ignore
                // .defined((d) => !isNaN(d.upper))
                .x((d: Data) => x(getX(d)))
                .y((d: Data) => y(getY(d)))

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
                .attr('d', area(data))
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
                .datum(data)
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
                        .line()
                        //@ts-ignore
                        .x((d: Data) => x(getX(d)))
                        .y((d: Data) => y(getY(d)))
                )

            //svg.append('path')
            //    .datum(data2)
            //    .attr('fill', 'none')
            //    .attr('stroke', '#fff')
            //    .attr('stroke-width', 1.5)
            //    .attr('stroke-linejoin', 'round')
            //    .attr('stroke-linecap', 'round')
            //    //@ts-ignore
            //    .attr('d', line)
        }
    }, [data])

    return (
        <div className={style.Chart}>
            <svg width={width} height={height} ref={d3Container} />
        </div>
    )
}

export default DistributionChart
