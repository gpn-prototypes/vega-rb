import { isEmpty } from 'utils/index';

describe('isEmpty', () => {
  test('Пустая строка', () => {
    expect(isEmpty('')).toBeTruthy();
  });

  test('Строка с пробелами', () => {
    expect(isEmpty('    ')).toBeTruthy();
  });

  test('Проверка null', () => {
    expect(isEmpty(null)).toBeTruthy();
  });

  test('Проверка undefined', () => {
    expect(isEmpty(undefined)).toBeTruthy();
  });
});
