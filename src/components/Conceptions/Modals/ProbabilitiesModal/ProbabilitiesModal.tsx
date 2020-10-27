import React, { useCallback, useEffect, useState } from 'react';
import { Button, IconQuestion, Modal, Text } from '@gpn-prototypes/vega-ui';
import { isFinite, sumBy } from 'lodash/fp';
import { Conception } from 'types';

import { cnModal } from './cn-modal';
import { ProbabilityInput } from './ProbabilityInput';

import './ProbabilitiesModal.css';

interface IProps {
  portal: HTMLDivElement | null | undefined;
  handleClose: () => void;
  isOpen: boolean;
  conceptionsList: Conception[];
  onSuccess: (data: Conception) => void;
}

const MAX_VALUE_ERROR =
  'Сумма всех вероятностей превышают максимальное значение';

const ProbabilitiesModal: React.FC<IProps> = ({
  portal,
  handleClose,
  conceptionsList,
  isOpen,
  onSuccess,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [conceptions, setConceptions] = useState<Conception[]>([]);

  const onSuccessHandler = () => {
    if (!errors.length) {
      conceptions.map((conception) => onSuccess(conception));
      handleClose();
    }
  };

  const sumProbabilities = useCallback((): number => {
    return sumBy((el) => {
      const parsedValue = Number.parseFloat(String(el.probability));
      return isFinite(parsedValue) ? parsedValue : 0;
    }, conceptions);
  }, [conceptions]);

  const onChangeProbability = (conception: Conception) => {
    setConceptions((prevState) => {
      return prevState.map((el) => {
        if (el.id === conception.id) return conception;
        return el;
      });
    });
  };

  const validate = useCallback((): boolean => {
    if (sumProbabilities() > 1) {
      setErrors([MAX_VALUE_ERROR]);
      return false;
    }
    setErrors([]);
    return true;
  }, [sumProbabilities]);

  useEffect(() => {
    setConceptions(conceptionsList);
  }, [conceptionsList]);

  useEffect(() => {
    validate();
  }, [conceptions, validate]);

  return (
    <Modal
      portal={portal}
      onClose={handleClose}
      isOpen={isOpen}
      className={cnModal}
      hasOverlay
      hasCloseButton
    >
      <Modal.Header>
        <Text size="xs">Вероятность концепций</Text>
      </Modal.Header>
      <Modal.Body className={cnModal('Body')}>
        <div className={cnModal('Wrapper')}>
          <Text
            view="secondary"
            size="s"
            className={cnModal('Wrapper', 'Left').toString()}
          >
            Название концепций
          </Text>
          <Text
            view="secondary"
            size="s"
            className={cnModal('Wrapper', 'Right').toString()}
          >
            Вероятность
          </Text>
        </div>

        {conceptions.map((conception) => (
          <ProbabilityInput
            key={conception.id}
            conception={conception}
            onChange={(probability) => {
              onChangeProbability({
                ...conception,
                probability,
              });
            }}
          />
        ))}

        <div className={cnModal('Info')}>
          <IconQuestion size="s" view="ghost" />
          <Text size="xs" view={!errors.length ? 'secondary' : 'alert'}>
            Вероятность может быть от 0 до 1 включительно. Сумма вероятностей
            всех концепций в проекте не может быть больше единицы
          </Text>
        </div>
      </Modal.Body>
      <Modal.Footer className={cnModal('Footer')}>
        <Button
          className={cnModal('CancelButton').toString()}
          size="s"
          view="ghost"
          label="Отмена"
          onClick={handleClose}
        />
        <Button
          size="s"
          view="primary"
          label="Сохранить"
          onClick={onSuccessHandler}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ProbabilitiesModal;
