import { GridColumn } from 'components/ExcelTable/types';
import {
  RbDomainEntityIcons,
  RbDomainEntityInput,
  VisibleInput,
} from 'generated/graphql';

export default function assembleDomainEntities(
  columns: GridColumn[],
): Array<RbDomainEntityInput> {
  return columns.map(({ name, key, visible }) => ({
    name: String(name),
    icon: RbDomainEntityIcons.FormationIcon,
    code: key,
    visible: visible as VisibleInput,
  }));
}
