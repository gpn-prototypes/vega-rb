import React from 'react';
import { Button } from '@gpn-prototypes/vega-ui';
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

export default React.memo<IProps>(function DescriptionModal({
  conception: { title, description },
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
        label="Редактировать"
        onClick={onClose}
      />
      <Button size="s" view="primary" label="Закрыть" onClick={onSuccess} />
    </>
  );

  return (
    <CommonModal
      title={title}
      bodyContent={description}
      footerContent={Footer}
      onClose={onClose}
      hasCloseButton
      hasOverlay
      {...props}
    />
  );
});
