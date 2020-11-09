import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';

import { DistributionParametersMap } from './types';

const distributionParametersMap: DistributionParametersMap = {
  [DistributionTypes.Uniform]: {
    types: [
      {
        type: DistributionDefinitionTypes.MinMax,
        title: 'Минимум, максимум',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.MinMax]: [
        {
          key: DistributionParameterTypes.Min,
          title: 'Минимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Максимум',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Triangular]: {
    types: [
      {
        type: DistributionDefinitionTypes.ModeMinMax,
        title: 'Минимум, наиболее вероятное, максимум',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.ModeMinMax]: [
        {
          key: DistributionParameterTypes.Min,
          title: 'Минимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Mode,
          title: 'Наиболее вероятное',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Максимум',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Lognormal]: {
    types: [
      {
        type: DistributionDefinitionTypes.LocationMeanlogSdlog,
        title: 'Расположение, лог. среднее, лог. станд. отклонение',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.LocationMeanlogSdlog]: [
        {
          key: DistributionParameterTypes.Location,
          title: 'Расположение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Meanlog,
          title: 'Лог. среднее',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Sdlog,
          title: 'Лог. стандартное',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Normal]: {
    types: [
      {
        type: DistributionDefinitionTypes.MeanSd,
        title: 'Среднее, станд. отклонение',
      },
      {
        type: DistributionDefinitionTypes.MinMax,
        title: 'Минимум, максимум',
      },
      {
        type: DistributionDefinitionTypes.TwoPercentiles,
        title: 'Р90, Р10',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.TwoPercentiles]: [
        {
          key: DistributionParameterTypes.Q2Value,
          rankKey: DistributionParameterTypes.Q2Rank,
          defaultRankValue: '90',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Q1Value,
          rankKey: DistributionParameterTypes.Q1Rank,
          defaultRankValue: '10',
          defaultValue: '',
        },
      ],
      [DistributionDefinitionTypes.MeanSd]: [
        {
          key: DistributionParameterTypes.Mean,
          title: 'Среднее',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.StandardDeviation,
          title: 'Стандартное',
          defaultValue: '',
        },
      ],
      [DistributionDefinitionTypes.MinMax]: [
        {
          key: DistributionParameterTypes.Min,
          title: 'Минимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Максимум',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Beta]: {
    types: [
      {
        type: DistributionDefinitionTypes.AlphaBetaMinMax,
        title: 'Минимум, Максимум, Альфа, Бета',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.AlphaBetaMinMax]: [
        {
          key: DistributionParameterTypes.Min,
          title: 'Минимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Максимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Alpha,
          title: 'Альфа',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Beta,
          title: 'Бета',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Pert]: {
    types: [
      {
        type: DistributionDefinitionTypes.ModeMinMax,
        title: 'Минимум, наиболее вероятное, максимум',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.ModeMinMax]: [
        {
          key: DistributionParameterTypes.Min,
          title: 'Минимум',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Mode,
          title: 'Наиболее вероятное',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Max,
          title: 'Максимум',
          defaultValue: '',
        },
      ],
    },
  },
};

export default distributionParametersMap;
