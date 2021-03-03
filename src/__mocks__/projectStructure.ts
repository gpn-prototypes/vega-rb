import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
  DomainObject,
  GeoObjectCategories,
  ProjectStructure,
  RbDomainEntityIcons,
} from 'generated/graphql';

export const domainObject: DomainObject = {
  visible: true,
  domainObjectPath: [
    {
      code: 'AREA',
      value: 'Первый',
    },
    {
      code: 'DEPOSIT',
      value: 'Гринфилд',
    },
    {
      code: '9a0c5352-31db-4a96-969d-b93eec4df975',
      value: 'Боровое',
    },
  ],
  geoObjectCategory: GeoObjectCategories.Resources,
  risksValues: [
    {
      code: 'PARENT_MATERIAL',
      value: 1,
    },
    {
      code: 'MIGRATION',
      value: 1,
    },
    {
      code: 'COLLECTOR',
      value: 0.7,
    },
  ],
  attributeValues: [
    {
      code: 'OIL_POOL_AREA',
      distribution: {
        type: DistributionTypes.Normal,
        definition: DistributionDefinitionTypes.MeanSd,
        parameters: [
          {
            type: DistributionParameterTypes.Mean,
            value: 16775,
            __typename: 'DistributionParameter',
          },
          {
            type: DistributionParameterTypes.Sd,
            value: 1500,
            __typename: 'DistributionParameter',
          },
        ],
        __typename: 'Distribution',
      },
      visibleValue: {
        rank: 50,
        value: 16775.000000000015,
        __typename: 'VisibleValue',
      },
      __typename: 'AttributeValue',
    },
  ],
  __typename: 'DomainObject',
};

export const projectStructure: ProjectStructure = {
  domainObjects: [domainObject],
  domainEntities: [
    {
      name: 'Лиц. Участок',
      code: 'AREA',
      icon: RbDomainEntityIcons.FormationIcon,
      visible: {
        calc: true,
        table: true,
        tree: true,
        __typename: 'Visible',
      },
      __typename: 'RBDomainEntity',
    },
    {
      name: 'Месторождение',
      code: 'DEPOSIT',
      icon: RbDomainEntityIcons.FormationIcon,
      visible: {
        calc: true,
        table: true,
        tree: true,
        __typename: 'Visible',
      },
      __typename: 'RBDomainEntity',
    },
    {
      name: 'Поднятие',
      code: '9a0c5352-31db-4a96-969d-b93eec4df975',
      icon: RbDomainEntityIcons.FormationIcon,
      visible: {
        calc: true,
        table: true,
        tree: true,
        __typename: 'Visible',
      },
      __typename: 'RBDomainEntity',
    },
  ],
  risks: [
    {
      code: 'PARENT_MATERIAL',
      name: 'Мат. порода',
      __typename: 'Risk',
    },
    {
      code: 'MIGRATION',
      name: 'Миграция',
      __typename: 'Risk',
    },
    {
      code: 'COLLECTOR',
      name: 'Коллектор',
      __typename: 'Risk',
    },
  ],
  attributes: [
    {
      code: 'OIL_POOL_AREA',
      name: 'Площадь залежи',
      shortName: 'F',
      units: 'тыс. м²',
      __typename: 'Attribute',
    },
    {
      code: 'OIL_POOL_NET_THICKNESS',
      name: 'Эффективная толщина залежи',
      shortName: 'H эфф.нн',
      units: 'м',
      __typename: 'Attribute',
    },
    {
      code: 'FORMATION_POROSITY_RATIO',
      name: 'Коэффициент пористости пласта',
      shortName: 'Кп',
      units: 'д. ед.',
      __typename: 'Attribute',
    },
  ],
  __typename: 'ProjectStructure',
};
