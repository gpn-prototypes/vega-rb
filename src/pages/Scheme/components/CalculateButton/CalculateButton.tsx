import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@gpn-prototypes/vega-ui';
import projectService from 'services/ProjectService';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { assembleErrors } from 'utils';

export const CalculateButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table);

  const handleClick = () => {
    projectService.getTableTemplate().then((templateStructure) => {
      setIsLoading(true);

      return projectService
        .getCalculationResultFileId(tableData, templateStructure)
        .then(({ resultId, errors }) => {
          setIsLoading(false);

          if (resultId) {
            projectService.getCalculationArchive(resultId).then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = 'result.zip';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            });
          } else if (errors?.length) {
            dispatch(tableDuck.actions.updateErrors(assembleErrors(errors)));
          }
        })
        .catch((error) => {
          setIsLoading(false);
          // eslint-disable-next-line no-console
          console.error('Something went wrong by calculating...', error);
        });
    });
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
