import React, { useRef, useState } from 'react';
import { IconKebab, NavigationList, Text } from '@gpn-prototypes/vega-ui';
import { CONCEPTIONS_CONTEXT_ID } from 'components/Conceptions/types';
import { withContextMenu } from 'components/ContextMenu/withContextMenu';

import { cnConceptions } from '../cn-conceptions';

interface IProps {
  id: string;
  title: string;
  setActive: (id: string) => void;
  isActive: boolean;
  className?: string;
}

export default React.memo<IProps>(function ConceptionItem({
  className,
  setActive,
  ...props
}) {
  const { id, title, isActive } = props;
  const [isContextShow, setIsContextShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <NavigationList.Item
      active={isActive}
      className={cnConceptions('Item').state({ active: isActive })}
    >
      {() => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          ref={ref}
          className={cnConceptions('Item', 'Wrapper')}
          onMouseEnter={() => setIsContextShow(true)}
          onMouseLeave={() => setIsContextShow(false)}
          onClick={() => setActive(id)}
        >
          <Text
            view="primary"
            size="xs"
            className={cnConceptions('Item', 'Title').toString()}
          >
            {title}
          </Text>
          {isContextShow &&
            withContextMenu(<IconKebab size="xs" />, {
              id: CONCEPTIONS_CONTEXT_ID,
              mouseButton: 0,
              collect: () => ({ idx: props }),
            })}
        </div>
      )}
    </NavigationList.Item>
  );
});
