import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useAsyncError() {
  const [, setError] = useState();
  return useCallback(
    (e) => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
}

export default useAsyncError;
