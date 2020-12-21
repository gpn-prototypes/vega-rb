import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@gpn-prototypes/vega-ui';
import projectService from 'services/ProjectService';
import tableDuck from 'store/tableDuck';
import { RootState } from 'store/types';
import { assembleErrors } from 'utils';

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
            dispatch(tableDuck.actions.updateErrors({}));
          } else if (errors?.length) {
            dispatch(tableDuck.actions.updateErrors(assembleErrors(errors)));
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
