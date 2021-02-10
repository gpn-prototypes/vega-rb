import { GridColumn } from 'components/ExcelTable/types';
import { RiskInput } from 'generated/graphql';

export default function assembleRisks(columns: GridColumn[]): Array<RiskInput> {
  return columns.map(({ key, name }) => ({
    code: key,
    name,
  }));
}
