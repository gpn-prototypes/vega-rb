import React from 'react';
import { Button, Text, TextField } from '@gpn-prototypes/vega-ui';
import { Conception, NoopFunction } from 'types';

import { CommonModal } from '../CommonModal';
import { cnModal } from '../ProbabilitiesModal/cn-modal';
import { CloseEvent } from '../types';

interface IProps {
  conception: Conception;
  isOpen: boolean;
  onClose: NoopFunction<CloseEvent>;
  onSuccess: NoopFunction;
  portal?: HTMLDivElement | null;
}

export default React.memo<IProps>(function EditModal({
  conception: { title, description },
  onClose,
  onSuccess,
  ...props
}) {
  const Body = (
    <>
      <Text size="s" view="ghost">
        Введите новое название концепции
      </Text>
      <TextField width="full" size="s" value={title} />

      <Text view="secondary" size="s" className={cnModal('Subtitle')}>
        Описание концепции
      </Text>
      <TextField
        type="textarea"
        width="full"
        size="s"
        rows={3}
        minRows={3}
        max={256}
        value={description}
      />
    </>
  );

  const Footer = (
    <>
      <Button
        className={cnModal('CancelButton').toString()}
        size="s"
        view="ghost"
        label="Редактировать"
        onClick={onClose}
      />
      <Button size="s" view="primary" label="Закрыть" onClick={onSuccess} />
    </>
  );

  return (
    <CommonModal
      title="Редактирование концепции"
      bodyContent={Body}
      footerContent={Footer}
      onClose={onClose}
      hasCloseButton
      hasOverlay
      {...props}
    />
  );
});
