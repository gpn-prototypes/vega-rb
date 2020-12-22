import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@gpn-prototypes/vega-ui';
import projectService from 'services/ProjectService';
import tableDuck from 'store/tableDuck';
import { assembleErrors, unpackTableData } from 'utils';

export const CalculateButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await projectService.getResourceBaseData();
      const structure = await projectService.getStructure();
      const data = unpackTableData(structure, projectService.version);

      dispatch(tableDuck.actions.initState(data));

      const calculation = await projectService.getCalculationResultFileId(data);

      if (calculation.resultId) {
        dispatch(tableDuck.actions.updateErrors({}));

        const blob = await projectService.getCalculationArchive(
          calculation.resultId,
        );

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'result.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (calculation.errors?.length) {
        dispatch(
          tableDuck.actions.updateErrors(assembleErrors(calculation.errors)),
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Something went wrong by calculating...', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      label="Рассчитать"
      view="ghost"
      onClick={handleClick}
      loading={isLoading}
    />
  );
};
