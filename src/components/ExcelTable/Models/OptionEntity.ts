import { DropdownOption } from 'components/ExcelTable/types';

export class OptionEntity implements DropdownOption {
  id: string;

  text: string;

  value: string;

  constructor(id: string, text: string) {
    this.id = id;
    this.value = id;
    this.text = text;
  }

  toString(): string {
    return this.text;
  }
}
