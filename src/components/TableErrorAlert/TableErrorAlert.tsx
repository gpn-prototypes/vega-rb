import React, { useEffect, useState } from 'react';
import { Item } from '@consta/uikit/SnackBar';
import { IconAlert, SnackBar } from '@gpn-prototypes/vega-ui';

import { cnTableErrorAlert } from './cn-table-error-alert';

import './TableErrorAlert.css';

type Props = {
  isShow: boolean;
};

export const TableErrorAlert: React.FC<Props> = ({ isShow }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (isShow) {
      setItems([
        {
          key: 1,
          message:
            'В таблице есть одинаковые строки. Удалите их или отредактируйте, чтобы запустить расчет',
          icon: IconAlert,
          status: 'alert',
          onClose: () => setItems([]),
        },
      ]);
    } else {
      setItems([]);
    }
  }, [isShow]);

  return (
    <div className={cnTableErrorAlert()}>
      <SnackBar items={items} />
    </div>
  );
};
