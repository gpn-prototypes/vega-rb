import React from 'react';
import { Modal, Text } from '@gpn-prototypes/vega-ui';

import { ModalProps } from '../types';

import { cnModal } from './cn-modal';

interface IProps extends ModalProps {
  title: string;
  bodyContent: string | JSX.Element;
  footerContent: JSX.Element;
}

const CommonModal: React.FC<IProps> = ({
  title,
  bodyContent,
  footerContent,
  ...props
}) => {
  return (
    <Modal {...props}>
      <Modal.Header>
        <Text size="xs">{title}</Text>
      </Modal.Header>
      <Modal.Body className={cnModal('Body')}>{bodyContent}</Modal.Body>
      <Modal.Footer className={cnModal('Footer')}>{footerContent}</Modal.Footer>
    </Modal>
  );
};

export default CommonModal;
