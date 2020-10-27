import React, { ComponentType } from 'react';
import { NoopFunction } from 'types';

export const CONCEPTIONS_CONTEXT_ID = 'conception-context-menu';

export interface IMenuItem {
  id: string;
  title: string;
  onClick: NoopFunction;
  Icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
}
