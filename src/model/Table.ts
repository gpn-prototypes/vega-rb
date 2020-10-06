export const CATEGORIES_TYPES = new Map<string, string>([
  ['Лиц. Участок', 'area'],
  ['Месторождение', 'deposit'],
  ['Пласт', 'layer'],
  ['Скважина', 'well'],
  ['Залежь', 'mine'],
]);

export enum SpecialColumns {
  ID = 'id',
  SPLITTER = 'splitter',
  SPLITTER_RISKS = 'splitter_risks',
}
