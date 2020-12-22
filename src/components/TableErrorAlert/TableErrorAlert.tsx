import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Item } from '@consta/uikit/SnackBar';
import { IconAlert, SnackBar } from '@gpn-prototypes/vega-ui';
import { RbErrorCodes, TableError } from 'generated/graphql';
import { RootState } from 'store/types';
import { COLUMN_ERROR_KEY } from 'utils/assembleErrors';

import { cnTableErrorAlert } from './cn-table-error-alert';

import './TableErrorAlert.css';

const errorMessages = {
  [RbErrorCodes.DuplicatingColumns]:
    'Требуется проверка названий столбцов. Названия не являются уникальными',
  [RbErrorCodes.IdenticalRowInTableData]:
    'В таблице есть одинаковые строки. Удалите их или отредактируйте, чтобы запустить расчет',
};

export const TableErrorAlert: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const errors = useSelector(({ table }: RootState) => table.errors);

  const tableRowErrors = useMemo(
    () =>
      Object.keys(errors)
        .filter((key) => key.match('row'))
        .map((key) => errors[key]),
    [errors],
  );

  const tableColumnError: TableError | undefined = useMemo(
    () => errors[COLUMN_ERROR_KEY] as TableError,
    [errors],
  );

  useEffect(() => {
    if (tableColumnError) {
      setItems((arr) => [
        ...arr,
        {
          key: RbErrorCodes.DuplicatingColumns,
          message: errorMessages[RbErrorCodes.DuplicatingColumns],
          icon: IconAlert,
          status: 'alert',
          onClose: () =>
            setItems((prevArr) =>
              prevArr.filter(
                ({ key }) => key !== RbErrorCodes.DuplicatingColumns,
              ),
            ),
        },
      ]);
    }
    if (tableRowErrors.length) {
      setItems((arr) => [
        ...arr,
        {
          key: RbErrorCodes.IdenticalRowInTableData,
          message: errorMessages[RbErrorCodes.IdenticalRowInTableData],
          icon: IconAlert,
          status: 'alert',
          onClose: () =>
            setItems((prevArr) =>
              prevArr.filter(
                ({ key }) => key !== RbErrorCodes.IdenticalRowInTableData,
              ),
            ),
        },
      ]);
    }
  }, [tableColumnError, tableRowErrors]);

  return (
    <div className={cnTableErrorAlert()}>
      <SnackBar items={items} />
    </div>
  );
};
