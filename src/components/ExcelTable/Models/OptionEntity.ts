import { DropdownOption } from 'components/ExcelTable/types';
import { GeoObjectCategories } from 'generated/graphql';

export class OptionEntity implements DropdownOption {
  private readonly _id: GeoObjectCategories;

  text: string;

  value: string;

  constructor(id: GeoObjectCategories, text: string) {
    this._id = id;
    this.value = id;
    this.text = text;
  }

  get id(): GeoObjectCategories {
    return this._id;
  }

  toString(): string {
    return this.text;
  }
}
