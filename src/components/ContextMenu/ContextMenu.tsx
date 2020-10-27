import React, { PropsWithChildren } from 'react';
import {
  ContextMenu as BaseContextMenu,
  ContextMenuProps,
} from 'react-contextmenu';
import { classnames } from '@bem-react/classnames';
import { usePortalRender } from '@gpn-prototypes/vega-ui';

import { cnContextMenu } from './cn-context-menu';

import './react-context.css';
import './ContextMenu.css';

interface IProps extends ContextMenuProps {
  title?: string;
}

export default React.memo<PropsWithChildren<IProps>>(function ContextMenu({
  id,
  children,
  className,
  ...props
}) {
  const { renderPortalWithTheme } = usePortalRender();

  return renderPortalWithTheme(
    <BaseContextMenu
      id={id}
      {...props}
      className={classnames(cnContextMenu(), className)}
    >
      {children}
    </BaseContextMenu>,
    document.body,
  );
});
