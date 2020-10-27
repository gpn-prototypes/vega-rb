import React from 'react';

export type ContextHandler<T> = (
  e: React.MouseEvent<HTMLDivElement>,
  { idx }: { idx: T },
) => void;
