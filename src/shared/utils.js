// @flow

import * as d3 from 'd3'

const Utils = {}

// Returns the Max coordinate from the data set
Utils.max = (data: Array<Object>, key: string) => d3.max(data, d => d[key])

// Returns a function that "scales" Y coordinates from the data to fit the chart
Utils.scale = (
  range: Array<number>,
  domain: Array<number>,
  coords: number,
): number =>
  d3
    .scaleLinear()
    .range(range)
    .domain(domain)(coords)

export default Utils
