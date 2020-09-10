import React, { useState } from 'react';
import { Button } from '@gpn-prototypes/vega-button';

import ChartForm from './components/ChartForm';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
import Table from './components/Table';

import style from './Scheme.module.css';

const SchemePage: React.FC = () => {
  const [showGraph, setShowGraph] = useState<boolean>(true);

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
      </div>
      <div className={style.Content}>
        <div className={style.LeftPanel}>
          <Table onSelect={setShowGraph} />
        </div>
        <div className={style.RightPanel} hidden={showGraph}>
          <ChartForm />
        </div>
      </div>
    </div>
  );
};

export default SchemePage;
