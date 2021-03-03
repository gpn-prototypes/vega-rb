import { domainObject, projectStructure } from '__mocks__/projectStructure';
import {
  DistributionDefinitionTypes,
  DistributionParameterTypes,
  DistributionTypes,
} from 'generated/graphql';

import { collectValues, collectValuesWithDistribution } from './collectors';
import constructRows from './constructRows';

describe('Преобразование структур данных с сервера', () => {
  test('Значения геологических объектов в HashMap', () => {
    const expectedObject = {
      'AREA': { value: 'Первый' },
      'DEPOSIT': { value: 'Гринфилд' },
      '9a0c5352-31db-4a96-969d-b93eec4df975': { value: 'Боровое' },
    };

    expect(collectValues(domainObject.domainObjectPath)).toMatchObject(
      expectedObject,
    );
  });

  test('Значения рисков в HashMap', () => {
    const expectedObject = {
      PARENT_MATERIAL: { value: 1 },
      MIGRATION: { value: 1 },
      COLLECTOR: { value: 0.7 },
    };

    expect(collectValues(domainObject.risksValues)).toMatchObject(
      expectedObject,
    );
  });

  test('Значения аттрибутов в HashMap', () => {
    const expectedObject = {
      OIL_POOL_AREA: {
        value: 16775.000000000015,
        args: {
          type: DistributionTypes.Normal,
          definition: DistributionDefinitionTypes.MeanSd,
          parameters: [
            {
              type: DistributionParameterTypes.Mean,
              value: 16775,
            },
            {
              type: DistributionParameterTypes.Sd,
              value: 1500,
            },
          ],
        },
      },
    };

    expect(
      collectValuesWithDistribution(domainObject.attributeValues),
    ).toMatchObject(expectedObject);
  });

  describe('constructRows', () => {
    test('Размер таблицы 1000 строк', () => {
      expect(constructRows(projectStructure)).toHaveLength(1000);
    });

    test('Индекс первой строки равен 1', () => {
      const expected = constructRows(projectStructure);

      expect(expected).toHaveProperty('0.id.value', 1);
    });
  });
});
