//@ts-ignore
import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import style from './style.module.css'
import { Numeric } from 'd3'

const height = 300
const width = 700

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
    q: number
    p: number
}
const array1 = Random_normal_Dist(30, 15) as Data[]
const array2 = Random_normal_Dist(30, 10) as Data[]

const DistributionChart: React.FC<{}> = () => {
    const d3Container = useRef(null)

    useEffect(() => {
        if (d3Container.current) {
            const svg = d3.select(d3Container.current)
            const getX = (d: Data) => d.q
            const getY = (d: Data) => d.p
            const x = d3.scaleLinear().rangeRound([0, width])
            // .domain([d3.min(points, getX), d3.max(points, getX)])
            // min q
            let d1 = d3.min(array1, getX) as Numeric
            let d2 = d3.min(array1, getX) as Numeric
            const min_d = d3.min([d1, d2]) as Numeric
            // max q
            d1 = d3.max(array1, getX) as Numeric
            d2 = d3.max(array1, getX) as Numeric
            const max_d = d3.max([d1, d2]) as Numeric
            // max p
            d1 = d3.max(array1, getY) as Numeric
            d2 = d3.max(array1, getY) as Numeric
            const max_p = d3.max([d1, d2]) as Numeric
            const y = d3.scaleLinear().domain([0, max_p]).range([height, 0])
            x.domain([min_d, max_d]).nice()
            const chart = d3
                .select(d3Container.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
            const gX = chart
                .append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x))
            let line = d3
                .line()
                .x((d) => x(d.q))
                .y((d) => y(d.p))
        }
    }, [])

    return (
        <div className={style.Chart}>
            <svg width={width} height={height} ref={d3Container} />
            <div>chart</div>
        </div>
    )
}

export default DistributionChart
