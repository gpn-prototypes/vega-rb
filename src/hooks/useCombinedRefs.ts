import React from 'react';
import { set } from 'lodash/fp';

type Ref<T> = null | React.RefObject<T> | React.RefCallback<T>;

export default function useCombinedRefs<T>(
  ...refs: Ref<T>[]
): React.RefObject<T> {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (ref === null) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        // eslint-disable-next-line lodash-fp/no-unused-result
        set(['current'], targetRef.current, ref);
      }
    });
  }, [refs]);

  return targetRef;
}
