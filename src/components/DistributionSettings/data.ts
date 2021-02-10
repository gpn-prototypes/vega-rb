import { DistributionParametersMap } from 'components/DistributionSettings/types';
import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';

// TODO: добавить оставшиеся распределения
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
  [DistributionTypes.Normal]: {
    types: [
      {
        type: DistributionDefinitionTypes.MeanSd,
        title: 'Среднее значение, станд. отклонение',
      },
      {
        type: DistributionDefinitionTypes.TwoPercentiles,
        title: 'Р90, Р10',
      },
      {
        type: DistributionDefinitionTypes.MinMax,
        title: 'Минимум, максимум',
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
          title: 'Среднее значение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Sd,
          title: 'Стандартное отклонение',
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
  [DistributionTypes.Lognormal]: {
    types: [
      {
        type: DistributionDefinitionTypes.LocationArmeanArsd,
        title: 'Расположение, среднее значение, станд. отклонение',
      },
      {
        type: DistributionDefinitionTypes.LocationLogmeanLogsd,
        title: 'Расположение, лог. среднее значение, лог. станд. отклонение',
      },
      {
        type: DistributionDefinitionTypes.LocationGeommeanGeomsd,
        title: 'Расположение, геом. среднее значение, геом. станд. отклонение',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.LocationArmeanArsd]: [
        {
          key: DistributionParameterTypes.Location,
          title: 'Расположение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Armean,
          title: 'Среднее значение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Arsd,
          title: 'Стандартное отклонение',
          defaultValue: '',
        },
      ],
      [DistributionDefinitionTypes.LocationGeommeanGeomsd]: [
        {
          key: DistributionParameterTypes.Location,
          title: 'Расположение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Geommean,
          title: 'Геом. среднее значение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Geomsd,
          title: 'Геом. стандартное отклонение',
          defaultValue: '',
        },
      ],
      [DistributionDefinitionTypes.LocationLogmeanLogsd]: [
        {
          key: DistributionParameterTypes.Location,
          title: 'Расположение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Logmean,
          title: 'Лог. среднее значение',
          defaultValue: '',
        },
        {
          key: DistributionParameterTypes.Logsd,
          title: 'Лог. стандартное отклонение',
          defaultValue: '',
        },
      ],
    },
  },
  [DistributionTypes.Triangular]: {
    types: [
      {
        type: DistributionDefinitionTypes.ModeMinMax,
        title: 'Минимум, наиболее вероятное значение, максимум',
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
          title: 'Наиболее вероятное значение',
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
        title: 'Минимум, максимум, альфа, бета',
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
        title: 'Минимум, наиболее вероятное значение, максимум',
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
          title: 'Наиболее вероятное значение',
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
  [DistributionTypes.Constant]: {
    types: [
      {
        type: DistributionDefinitionTypes.Constant,
        title: 'Константа',
      },
    ],
    fieldsByType: {
      [DistributionDefinitionTypes.Constant]: [
        {
          key: DistributionParameterTypes.Constant,
          title: 'Константа',
          defaultValue: '',
        },
      ],
    },
  },
};

export default distributionParametersMap;
