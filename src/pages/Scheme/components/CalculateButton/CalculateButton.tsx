import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@gpn-prototypes/vega-button';
import { TableError } from 'generated/graphql';
import projectService from 'services/ProjectService';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';

export const CalculateButton: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state: RootState) => state.table);

  const handleClick = () => {
    projectService.getTableTemplate().then((templateStructure) =>
      projectService
        .getCalculationResultFileId(tableData, templateStructure)
        .then(({ resultId, errors }) => {
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
            dispatch(
              tableDuck.actions.updateErrors(
                errors.filter((error: TableError) => error.tableName) || [],
              ),
            );
          }
        })
        .catch((e) =>
          // eslint-disable-next-line no-console
          console.error('Something went wrong by calculating...', e),
        ),
    );
  };

  return <Button label="Рассчитать" view="ghost" onClick={handleClick} />;
};
