import { DropDownOption } from 'components/ExcelTable/types';
import { GeoObjectCategories } from 'generated/graphql';

export class OptionEntity implements DropDownOption {
  private readonly _id: GeoObjectCategories;

  private readonly _value: GeoObjectCategories;

  text: string;

  constructor(id: GeoObjectCategories, text: string) {
    this._id = id;
    this._value = id;
    this.text = text;
  }

  get id(): GeoObjectCategories {
    return this._id;
  }

  get value(): GeoObjectCategories {
    return this._value;
  }

  toString(): string {
    return this.text;
  }
}
