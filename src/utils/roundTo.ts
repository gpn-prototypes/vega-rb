import { curry } from 'lodash/fp';

export const roundTo = curry((precision: number, value: number) => {
  const e = 10 ** precision;
  return Math.round(value * e) / e;
});
