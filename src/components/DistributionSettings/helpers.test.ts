import { isNumeric } from 'components/DistributionSettings/helpers';

describe('isNumeric', () => {
  test('пустая строка не может быть числом', () => {
    expect(isNumeric('')).toBeFalsy();
  });

  test('число как строка', () => {
    expect(isNumeric('123')).toBeTruthy();
  });

  test('число с дробной частью как строка', () => {
    expect(isNumeric('123.123')).toBeTruthy();
  });

  test('проверка number', () => {
    expect(isNumeric(1)).toBeTruthy();
  });

  test('строка с каким-то текстом', () => {
    expect(isNumeric('this is some text')).toBeFalsy();
  });
});
