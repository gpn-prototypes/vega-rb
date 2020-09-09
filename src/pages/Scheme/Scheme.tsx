import React, { useState } from 'react';
import { Button } from '@gpn-prototypes/vega-button';

import { CalculateButton } from './components/CalculateButton/CalculateButton';
import ChartForm from './components/ChartForm';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
import Table from './components/Table';
import { SelectedRow } from './components/Table/Table';

import style from './Scheme.module.css';

const SchemePage: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<SelectedRow>(null);

  return (
    <div className={style.SchemePage}>
      <div className={style.Header}>
        <Button
          label="Структура проекта"
          view="ghost"
          className={style.ButtonStructure}
        />
        <Button label="Данные" view="ghost" className={style.ButtonData} />
        <ExportButton />
        <ImportButton />
        <CalculateButton />
      </div>
      <div className={style.Content}>
        <div className={style.LeftPanel}>
          <Table onSelect={setSelectedRow} />
        </div>
        <div className={style.RightPanel} hidden={!selectedRow}>
          <ChartForm selectedRow={selectedRow} />
        </div>
      </div>
    </div>
  );
};

export default SchemePage;
