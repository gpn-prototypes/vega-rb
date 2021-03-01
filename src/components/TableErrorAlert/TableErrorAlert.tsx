import React, { useEffect, useMemo, useState } from 'react';
import { Item } from '@consta/uikit/SnackBar';
import { IconAlert, SnackBar } from '@gpn-prototypes/vega-ui';
import { ErrorWrapper } from 'components/ExcelTable/types';
import { RbErrorCodes } from 'generated/graphql';
import useGetError from 'hooks/useGetError';
import { defaultTo, get } from 'lodash/fp';

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
  const [, errors] = useGetError();
  const tableRowErrors = useMemo(
    () =>
      Object.keys(errors)
        .filter((key) => key.match('row'))
        .map((key) => errors[key]),
    [errors],
  );

  const tableColumnError = useMemo<ErrorWrapper>(
    () => errors[RbErrorCodes.DuplicatingColumns],
    [errors],
  );

  useEffect(() => {
    const generateItem = (errorCode: RbErrorCodes): Item => ({
      key: errorCode,
      message: defaultTo('', get([errorCode], errorMessages)),
      icon: IconAlert,
      status: 'alert',
      onClose: () => {
        setItems((prevArr) => prevArr.filter(({ key }) => key !== errorCode));
      },
    });

    if (tableColumnError) {
      setItems((prevState) => [
        ...prevState,
        generateItem(RbErrorCodes.DuplicatingColumns),
      ]);
    }
    if (tableRowErrors.length) {
      setItems((prevState) => [
        ...prevState,
        generateItem(RbErrorCodes.IdenticalRowInTableData),
      ]);
    }
  }, [tableColumnError, tableRowErrors]);

  return (
    <div className={cnTableErrorAlert()}>
      <SnackBar items={items} />
    </div>
  );
};
