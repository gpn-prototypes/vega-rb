import React, { useState } from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { SelectedCell } from 'components/ExcelTable/types';
import { Nullable } from 'types';

import CalculateButton from './components/CalculateButton';
import DistributionSettings from './components/DistributionSettings';
import Table from './components/Table';

import style from './Scheme.module.css';

const SchemePage: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<Nullable<SelectedCell>>(
    null,
  );
  return (
    <div className={style.SchemePage}>
      <div className={style.Header}>
        <Button label="Данные" view="ghost" className={style.ButtonData} />
        <CalculateButton />
      </div>
      <div className={style.Content}>
        <div className={style.LeftPanel}>
          <Table onSelect={setSelectedCell} />
        </div>
        <div className={style.RightPanel} hidden={!selectedCell}>
          {selectedCell && <DistributionSettings selectedCell={selectedCell} />}
        </div>
      </div>
    </div>
  );
};

export default SchemePage;
