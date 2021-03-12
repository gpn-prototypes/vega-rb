import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@gpn-prototypes/vega-ui';
import { ColumnErrors } from 'components/ExcelTable';
import { ProjectContext } from 'components/Providers';
import projectService from 'services/ProjectService';
import errorsDuck from 'store/errorsDuck';
import { RootState } from 'store/types';
import { assembleErrors } from 'utils';

const loadArchive = async (fileId: string) => {
  const { filename, data } = await projectService.getCalculationArchive(fileId);

  const url = window.URL.createObjectURL(data);
  const link = Object.assign(document.createElement('a'), {
    style: { display: 'none' },
    download: filename,
    href: url,
  });

  document.body.appendChild(link).click();
  window.URL.revokeObjectURL(url);
};

export const CalculateButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { vid: projectId } = useContext(ProjectContext).project;

  const tableData = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch();

  const dispatchErrors = (id: string, errors: ColumnErrors) =>
    dispatch(
      errorsDuck.actions.updateErrors({
        id,
        errors,
      }),
    );

  const handleClick = async () => {
    projectService.getTableTemplate().then((templateStructure) => {
      setIsLoading(true);

      return projectService
        .getCalculationResultFileId(tableData, templateStructure)
        .then(({ resultId, errors }) => {
          setIsLoading(false);

          if (resultId) {
            loadArchive(resultId);
            dispatchErrors(projectId, {});
          } else if (errors?.length) {
            dispatchErrors(projectId, assembleErrors(errors));
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
