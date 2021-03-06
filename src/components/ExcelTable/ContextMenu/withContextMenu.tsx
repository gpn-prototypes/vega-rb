import React, { ReactElement } from 'react';
import { ContextMenuTrigger, ContextMenuTriggerProps } from 'react-contextmenu';

export default function withContextMenu(
  Component: ReactElement,
  props: ContextMenuTriggerProps,
): JSX.Element {
  return (
    <ContextMenuTrigger {...props} holdToDisplay={-1}>
      {Component}
    </ContextMenuTrigger>
  );
}
