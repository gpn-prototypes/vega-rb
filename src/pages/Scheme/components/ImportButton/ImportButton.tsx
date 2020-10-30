import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Button } from '@gpn-prototypes/vega-button';
import { FileInput } from '@gpn-prototypes/vega-file-input';
import { IconAlert, IconAttach, IconProps } from '@gpn-prototypes/vega-icons';
import { SnackBar } from '@gpn-prototypes/vega-snack-bar';
import { Maybe } from 'generated/graphql';
import useAsyncError from 'hooks/useAsyncError';
import tableDuck from 'store/tableDuck';
import { ProjectStructure } from 'types';
import { mockTableRows, unpackTableData } from 'utils';

import { VALIDATE_BEFORE_LOAD } from '../../queries';

import styles from './ImportButton.module.css';

interface IValidateBeforeLoadResponse {
  project: {
    validateBeforeLoad: Maybe<{
      code: string;
      message: string;
      details: string;
    }>;
  };
}

type StatusType =
  | 'alert'
  | 'success'
  | 'warning'
  | 'system'
  | 'normal'
  | undefined;

interface ISnackItem {
  key: string | number;
  message?: string | number;
  status?: StatusType;
  autoClose?: boolean | number;
  icon?: React.FC<IconProps>;
  onClose?: (item: ISnackItem) => void;
  onAutoClose?: (item: ISnackItem) => void;
}

export const ImportButton: React.FC = () => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const throwError = useAsyncError();
  const [snacks, setSnacks] = useState<ISnackItem[]>([] as ISnackItem[]);
  const importData = (e: DragEvent | ChangeEvent): void => {
    const { files } = e.target as HTMLInputElement;
    const file = files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = async function onLoad(): Promise<void> {
        const readerResult = JSON.parse(
          reader.result as string,
        ) as ProjectStructure;
        const {
          domainEntities,
          calculationParameters,
          domainObjects,
        } = readerResult;

        const { data } = await client
          .query<IValidateBeforeLoadResponse>({
            query: VALIDATE_BEFORE_LOAD,
            variables: {
              project: {
                version: '0.1.0',
                structure: {
                  domainEntities,
                  domainObjects,
                  attributes: calculationParameters,
                },
              },
            },
          })
          .catch((error) => {
            throw throwError(error);
          });

        if (data?.project.validateBeforeLoad === null) {
          const { columns, rows: gridRows = mockTableRows } = unpackTableData(
            readerResult,
          );
          dispatch(tableDuck.actions.updateColumns(columns));
          dispatch(tableDuck.actions.updateRows(gridRows));
        } else if (data) {
          setSnacks([
            {
              key: 'error',
              message: data.project.validateBeforeLoad.message,
              icon: IconAlert,
              status: 'alert',
              onClose: (): void => setSnacks([]),
              onAutoClose: (): void => setSnacks([]),
              autoClose: 5,
            },
          ]);
        }
      };
      reader.onerror = function onError(): void {
        // TODO: Noop
        // eslint-disable-next-line
        console.log(reader.error);
      };
    }
  };

  return (
    <>
      <FileInput
        id="import"
        accept="json"
        onChange={importData}
        className={styles.FileInput}
      >
        {(props): JSX.Element => (
          <Button
            {...props}
            label="Импорт"
            view="ghost"
            iconLeft={IconAttach}
          />
        )}
      </FileInput>
      <SnackBar items={snacks} className={styles.SnackBar} />
    </>
  );
};
