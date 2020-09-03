export class Option<T> {
  // eslint-disable-next-line
  constructor(readonly value: T, readonly label: string) {}

  static labelAccessor<V>(option: Option<V>): string {
    return option.label;
  }
}
