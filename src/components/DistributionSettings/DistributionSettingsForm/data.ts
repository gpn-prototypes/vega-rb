import { DistributionTypes } from 'generated/graphql';

export const options = [
  { value: DistributionTypes.Normal, label: 'Нормальное' },
  { value: DistributionTypes.Triangular, label: 'Треугольное' },
  { value: DistributionTypes.Uniform, label: 'Равномерное' },
  { value: DistributionTypes.Lognormal, label: 'Логнормальное' },
  { value: DistributionTypes.Beta, label: 'Бета' },
  { value: DistributionTypes.Pert, label: 'PERT' },
];
