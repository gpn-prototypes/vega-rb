import React from 'react';
import { Button } from '@gpn-prototypes/vega-ui';
import { CloseEvent } from 'components/Conceptions/Modals/types';
import { Conception, NoopFunction } from 'types';

import { CommonModal } from '../CommonModal';
import { cnModal } from '../ProbabilitiesModal/cn-modal';

interface IProps {
  conception: Conception;
  isOpen: boolean;
  onClose: NoopFunction<CloseEvent>;
  onSuccess: NoopFunction;
  portal?: HTMLDivElement | null;
}

export default React.memo<IProps>(function DeleteModal({
  conception: { title },
  onClose,
  onSuccess,
  ...props
}) {
  const Footer = (
    <>
      <Button
        className={cnModal('CancelButton').toString()}
        size="s"
        view="ghost"
        label="Отмена"
        onClick={onClose}
      />
      <Button size="s" view="primary" label="Удалить" onClick={onSuccess} />
    </>
  );

  return (
    <CommonModal
      title="Удаление концепции"
      bodyContent={<div>Удалить из проекта «{title}»?</div>}
      footerContent={Footer}
      onClose={onClose}
      hasCloseButton
      hasOverlay
      {...props}
    />
  );
});
