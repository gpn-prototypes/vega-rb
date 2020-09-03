import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { Button } from '@gpn-prototypes/vega-button';
import { RootState } from 'store/types';
import { packData } from 'utils/tableDataConverters';

import { GET_TABLE_TEMPLATE } from '../Table/queries';
import { TemplateProjectData } from '../Table/Table';

import styles from './ExportButton.module.css';

export const ExportButton: React.FC = () => {
  const tableData = useSelector((state: RootState) => state.table);
  const { data } = useQuery<TemplateProjectData>(GET_TABLE_TEMPLATE);
  const onClick = async (): Promise<void> => {
    if (data) {
      const fileData = packData(tableData, data.project.template.structure);
      const filename = 'export.json';
      const contentType = 'application/json;charset=utf-8;';
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(fileData)))], {
          type: contentType,
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        const a = document.createElement('a');
        a.download = filename;
        a.href = `data:${contentType},${encodeURIComponent(JSON.stringify(fileData))}`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  };
  return <Button label="Экспорт" view="ghost" onClick={onClick} className={styles.ExportButton} />;
};
