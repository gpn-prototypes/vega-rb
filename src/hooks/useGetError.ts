import { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ColumnErrors } from 'components/ExcelTable/types';
import { ProjectContext } from 'components/Providers';
import { TableError } from 'generated/graphql';
import { get, getOr } from 'lodash/fp';
import { RootState } from 'store/types';

type PropertyPath = string | (string | number)[];

export default function useGetError(
  path?: PropertyPath,
): [TableError, ColumnErrors] {
  const errors = useSelector(
    ({ errors: errorsState }: RootState) => errorsState,
  );
  const { vid: projectId } = useContext(ProjectContext).project;
  const errorsList = useMemo<ColumnErrors>(
    () => getOr({}, ['byId', projectId], errors),
    [errors, projectId],
  );
  const getError = (propertyPath?: PropertyPath): TableError => {
    return propertyPath ? get(propertyPath, errorsList) : ({} as TableError);
  };

  return [getError(path), errorsList];
}
