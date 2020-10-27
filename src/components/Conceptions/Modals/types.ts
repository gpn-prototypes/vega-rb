import React from 'react';

export enum ConceptionModalTypes {
  NULL,
  CONCEPTION,
  PROBABILITIES,
  CALCULATION,
  DESCRIPTION,
}

export type CloseEvent =
  | MouseEvent
  | KeyboardEvent
  | TouchEvent
  | React.SyntheticEvent;

export interface ModalProps {
  onClose: (e: CloseEvent) => void;
  isOpen?: boolean;
  hasCloseButton?: boolean;
  children?: React.ReactNode;
  hasOverlay?: boolean;
  onOverlayClick?: React.EventHandler<React.MouseEvent>;
  portal?: HTMLDivElement | null;
  className?: string;
}
