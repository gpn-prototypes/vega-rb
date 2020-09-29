import { block } from 'bem-cn';

export const cnDistributionChart = block('DistributionChart');
export const cnAxis = cnDistributionChart('Axis');
export const cnGrid = cnDistributionChart('Grid');
export const cnProjectionLines = cnDistributionChart('ProjectionLines');
export const cnPercentilesText = cnDistributionChart('Percentiles', 'Text');

export const cnAxisLeft = cnDistributionChart('Axis', {
  Left: true,
});
export const cnAxisRight = cnDistributionChart('Axis', {
  Right: true,
});
