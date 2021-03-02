import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableEntities } from 'components/ExcelTable/enums';
import { chunk } from 'lodash/fp';

import { testId as itemTestId } from './HierarchyLevelItem';
import HierarchyLevelList, { testId } from './HierarchyLevelList';
import { HierarchyLevelListProps } from './types';

const renderComponent = (props: HierarchyLevelListProps): RenderResult =>
  render(<HierarchyLevelList {...props} />);

const addItem = () => {
  const input = screen.getByText('Добавить уровень иерархии');

  userEvent.click(input);

  const list = screen.getByTestId(testId.list);

  if (list.lastChild === null) {
    throw new Error('child element not found');
  }

  return list.lastChild as HTMLElement;
};

const geoCategoryColumnsMock = [
  {
    key: 'AREA',
    name: 'Лиц. Участок',
    type: TableEntities.GEO_CATEGORY,
    visible: { calc: true, tree: true, table: true },
  },
  {
    key: 'DEPOSIT',
    name: 'Месторождение',
    type: TableEntities.GEO_CATEGORY,
    visible: { calc: true, tree: true, table: true },
  },
  {
    key: 'LAYER',
    name: 'Пласт',
    type: TableEntities.GEO_CATEGORY,
    visible: { calc: true, tree: true, table: true },
  },
  {
    key: 'MINE',
    name: 'Залежь',
    type: TableEntities.GEO_CATEGORY,
    visible: { calc: true, tree: true, table: true },
  },
];

describe('Компонент Настройка уровней иерархии (HierarchyLevelList)', () => {
  test('Рендерится без ошибок', () => {
    expect(() =>
      renderComponent({
        handleClose: () => {},
        onSubmit: () => {},
        items: [],
        isOpen: true,
      }),
    ).not.toThrow();
  });

  test('Срабатывает onSubmit', () => {
    const onSubmit = jest.fn();

    renderComponent({
      handleClose: () => {},
      onSubmit,
      items: [],
      isOpen: true,
    });

    const input = screen.getByText('Готово');

    userEvent.click(input);

    expect(onSubmit).toBeCalled();
  });

  test('Срабатывает onClose', () => {
    const handleClose = jest.fn();

    renderComponent({
      handleClose,
      onSubmit: () => {},
      items: [],
      isOpen: true,
    });

    const input = screen.getByTitle('Закрыть');

    userEvent.click(input);

    expect(handleClose).toBeCalled();
  });

  test('После нажатия на кнопку "Добавить уровень иерархии" добавляется элемент в режиме редактирования', () => {
    renderComponent({
      handleClose: () => {},
      onSubmit: () => {},
      items: [],
      isOpen: true,
    });

    const item = addItem();

    const textInput = item.querySelector('input');

    expect(item.classList.contains('is-editing')).toBeTruthy();
    expect(textInput?.disabled).toBeFalsy();
  });

  test('Элементы управления видимости расположены в правильном порядке', () => {
    const { getAllByTestId } = renderComponent({
      handleClose: () => {},
      onSubmit: () => {},
      items: geoCategoryColumnsMock,
      isOpen: true,
    });

    const expectedOrder = ['Расчет', 'Дерево', 'Таблица'];
    const tags = getAllByTestId(itemTestId.tag);
    const elements = chunk(
      3,
      tags.map((el) => el.textContent),
    );

    expect(
      elements.every((arr) =>
        arr.every((el, idx) => el === expectedOrder[idx]),
      ),
    ).toBeTruthy();
  });

  describe('Редактирование элементов уровней иерархии', () => {
    test.todo('Ошибка при сохранении пустого поля');
    test.todo('Ошибка при сохранении некорректного значения');
  });
});
