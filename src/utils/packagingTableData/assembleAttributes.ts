import { GridColumn } from 'components/ExcelTable/types';
import { AttributeInput, ProjectStructureInput } from 'generated/graphql';
import { defaultTo } from 'lodash/fp';
import { omitTypename } from 'utils/omitTypename';

const removeCommas = (str: string) => str.split(',').filter(Boolean).join(',');

export default function assembleAttributes(
  columns: GridColumn[],
  tableTemplate: ProjectStructureInput,
): Array<AttributeInput> {
  return columns.map(({ key, name }) => {
    const attribute = tableTemplate.attributes.find(({ code }) => code === key);
    const nameWithoutCommas = removeCommas(String(name));

    return omitTypename(
      defaultTo(
        {
          code: key,
          name: nameWithoutCommas,
          shortName: nameWithoutCommas,
          units: '',
        },
        attribute,
      ),
    ) as AttributeInput;
  });
}
