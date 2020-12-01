export interface Percentile {
  rank: number;
  point: Point;
}

export interface Point {
  x: number;
  y: number;
}

export interface ChartData {
  sf: Point[];
  pdf: Point[];
  percentiles: Percentile[];
}
