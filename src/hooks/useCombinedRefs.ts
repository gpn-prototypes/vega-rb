import React from 'react';

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
        // @ts-expect-error: readonly
        ref.current = targetRef.current; // eslint-disable-line no-param-reassign
      }
    });
  }, [refs]);

  return targetRef;
}
