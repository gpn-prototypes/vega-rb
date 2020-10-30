import React from 'react';
import { getNodeText, render } from '@testing-library/react';
import { Formatter } from 'components/ExcelTable/Formatters';

import NumberFormatter from './NumberFormatter';

const getMockProps = jest.fn((value) => ({
  rowIdx: 1,
  isRowSelected: false,
  onRowSelectionChange: () => {},
  row: {
    cell: {
      value,
    },
  },
  column: {
    key: 'cell',
    idx: 1,
    width: 0,
    left: 0,
    name: 'cell',
    formatter: Formatter,
  },
}));

const mockComponent = jest.fn((value) => (
  <NumberFormatter {...getMockProps(value)} />
));

describe('NumberFormatter', () => {
  test('рендерится без ошибок', () => {
    render(mockComponent('1.32512'));
  });

  test('вывод Int без дробной части', () => {
    const { container } = render(mockComponent(50));
    expect(getNodeText(container)).toEqual('50');
  });

  test('вывод Float с округлением', () => {
    const { container } = render(mockComponent(1.32512));
    expect(getNodeText(container)).toEqual('1.325');
  });

  test('отображение нечисловых строк', () => {
    const { container } = render(mockComponent('Olololo'));
    expect(getNodeText(container)).toEqual('Olololo');
  });

  test('значение ячейки округляется до 3х знаков', () => {
    const { container } = render(mockComponent('1.32512'));
    expect(getNodeText(container)).toEqual('1.325');
  });
});
