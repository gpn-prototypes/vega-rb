export interface Point {
  x: number;
  y: number;
}

export interface Data {
  sf: Point[];
  pdf: Point[];
  percentiles: {
    rank: number;
    point: Point;
  }[];
}
