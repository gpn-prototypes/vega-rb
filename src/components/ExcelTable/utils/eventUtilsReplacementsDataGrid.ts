import React from 'react';

export function wrapEvent<E extends React.SyntheticEvent>(
  ourHandler: React.EventHandler<E>,
  theirHandler: React.EventHandler<E> | undefined,
): React.EventHandler<E> {
  if (theirHandler === undefined) return ourHandler;
  return function (event: React.SyntheticEvent) {
    ourHandler(event as E);
    theirHandler(event as E);
  };
}

export function preventDefault<E extends React.SyntheticEvent>(
  e: React.SyntheticEvent,
): void {
  e.preventDefault();
}
