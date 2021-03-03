import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@gpn-prototypes/vega-ui';
import { ColumnErrors } from 'components/ExcelTable';
import { ProjectContext } from 'components/Providers';
import projectService from 'services/ProjectService';
import errorsDuck from 'store/errorsDuck';
import tableDuck from 'store/tableDuck';
import { assembleErrors, unpackTableData } from 'utils';

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
  const { projectId } = useContext(ProjectContext);

  const dispatch = useDispatch();

  const dispatchErrors = (id: string, errors: ColumnErrors) =>
    dispatch(
      errorsDuck.actions.updateErrors({
        id,
        errors,
      }),
    );

  const handleClick = async () => {
    try {
      setIsLoading(true);

      await projectService.getResourceBaseData();
      const structure = await projectService.getStructure();
      const data = unpackTableData(structure, projectService.version);

      dispatch(tableDuck.actions.initState(data));

      const {
        resultId,
        errors,
      } = await projectService.getCalculationResultFileId(data);

      if (resultId) {
        await loadArchive(resultId);
        dispatchErrors(projectId, {});
      } else if (errors?.length) {
        dispatchErrors(projectId, assembleErrors(errors));
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
