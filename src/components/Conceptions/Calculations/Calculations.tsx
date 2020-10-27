/* eslint-disable */
// @ts-nocheck
import React from 'react';
import { Button, IconPlay, IconSettings, Text } from '@gpn-prototypes/vega-ui';
import { cnConceptions } from 'components/Conceptions/cn-conceptions';

interface IProps {
  onSuccess: (e: any) => void;
}

export default React.memo<IProps>(function Calculations({ onSuccess }) {
  return (
    <div>
      <Text
        size="xs"
        view="secondary"
        className={cnConceptions('Title').toString()}
      >
        Расчёты
      </Text>
      <div className={cnConceptions('ButtonGroup')}>
        <Button
          size="s"
          form="defaultBrick"
          label="Расчёт"
          iconLeft={IconPlay}
          iconSize="xs"
          className={cnConceptions('ButtonRun').toString()}
          onClick={onSuccess}
        />
        <Button
          size="s"
          form="brickDefault"
          iconLeft={IconSettings}
          iconSize="xs"
          onlyIcon
        />
      </div>
    </div>
  );
});
