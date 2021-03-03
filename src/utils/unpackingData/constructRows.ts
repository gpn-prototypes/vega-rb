import { GridRow } from 'components/ExcelTable/types';
import { entitiesOptions } from 'components/ExcelTable/utils/getEditor';
import {
  DomainObject,
  DomainObjectPathLevel,
  GeoObjectCategories,
  ProjectStructure,
  RbDomainEntity,
  RiskValue,
} from 'generated/graphql';
import { SpecialColumns } from 'model/Table';

import { collectValues, collectValuesWithDistribution } from './collectors';

function generateEmptyRows(count: number): Array<GridRow> {
  const getOrderNumber = (index: number) => {
    return count === 1000 ? index + 1 : Math.abs(count - 1000 - index - 1);
  };

  return Array.from({ length: count }, (val, index) => ({
    id: {
      value: getOrderNumber(index),
    },
  }));
}

function getGeoObjectCategoryValue(category: GeoObjectCategories) {
  return category === GeoObjectCategories.Resources
    ? entitiesOptions.RESOURCE
    : entitiesOptions.RESERVES;
}

function prepareRows(
  domainEntities: RbDomainEntity[],
  domainObjects: DomainObject[],
): GridRow[] {
  return domainObjects.map(
    (
      { domainObjectPath, geoObjectCategory, attributeValues, risksValues },
      idx,
    ) => {
      const id = { value: idx + 1 };
      const geoObjectCategoryValue = getGeoObjectCategoryValue(
        geoObjectCategory,
      );
      const domainEntitiesList = collectValues<DomainObjectPathLevel>(
        domainObjectPath,
      );
      const attributesList = collectValuesWithDistribution(attributeValues);
      const risksList = collectValues<RiskValue>(risksValues);

      return {
        id,
        [SpecialColumns.GEO_CATEGORY]: geoObjectCategoryValue,
        ...domainEntitiesList,
        ...attributesList,
        ...risksList,
      };
    },
  );
}

function constructRows({
  domainEntities = [],
  domainObjects = [],
}: ProjectStructure): GridRow[] {
  const rowsCount = 1000 - domainObjects.length;

  return [
    ...prepareRows(domainEntities, domainObjects),
    ...generateEmptyRows(rowsCount),
  ];
}

export default constructRows;
