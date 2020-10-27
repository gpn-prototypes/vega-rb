import React, { useState } from 'react';
import { Combobox } from '@consta/uikit/Combobox';
import {
  Button,
  ChoiceGroup,
  Modal,
  Text,
  TextField,
} from '@gpn-prototypes/vega-ui';
import { isEmpty } from 'lodash/fp';
import { ConceptionEntity } from 'model/ConceptionEntity';
import { Conception, Nullable } from 'types';

import { cnModal } from './cn-modal';
import { buildingTypes } from './data';

import './ConceptionsModal.css';

const buildingTypeValues = [buildingTypes.NEW, buildingTypes.FROM_OTHER];

interface IProps {
  portal: HTMLDivElement | null | undefined;
  handleClose: () => void;
  isOpen: boolean;
  conceptions: Conception[];
  onSuccess: (conception: Conception) => void;
}

export default React.memo<IProps>(function ConceptionsModal({
  portal,
  handleClose,
  conceptions,
  isOpen,
  onSuccess,
}) {
  const [buildType, setBuildType] = useState<Nullable<string>>(
    buildingTypes.NEW,
  );
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [parent, setParent] = useState<Nullable<Conception>>(null);
  const [errors, setErrors] = useState<{ name: string[] }>({ name: [] });

  const getItemLabel = (option: Conception): string => option.title;
  const validation = (): boolean => {
    if (!name.trim().length) {
      setErrors((prevState) => ({
        ...prevState,
        name: ['Некорректное название'],
      }));

      return false;
    }
    return true;
  };
  const createNewConception = () => {
    if (validation()) {
      onSuccess(new ConceptionEntity(name, description));
      handleClose();
    }
  };

  return (
    <Modal
      portal={portal}
      onClose={(e): void => {
        handleClose();
      }}
      // onOverlayClick={(e) => false}
      isOpen={isOpen}
      hasOverlay
      hasCloseButton
    >
      <Modal.Header>
        <Text size="xs">Создание концепции</Text>
      </Modal.Header>
      <Modal.Body className={cnModal('Body')}>
        <div className={cnModal('Wrapper')}>
          <ChoiceGroup<string>
            name="ChoiceGroup"
            view="ghost"
            size="s"
            width="full"
            items={buildingTypeValues}
            value={buildType}
            multiple={false}
            onChange={(data: {
              e: React.ChangeEvent<HTMLInputElement>;
              value: string | null;
            }): void => {
              setBuildType(data.value);
            }}
            getLabel={(item: string) => item}
          />
        </div>
        {buildType === buildingTypes.FROM_OTHER && (
          <div className={cnModal('Wrapper')}>
            <Text view="secondary" size="s" className={cnModal('Subtitle')}>
              Выбрать из списка существующую концепцию
            </Text>
            <Combobox<Conception>
              className={cnModal('ParentSelection')}
              id="parentConception"
              size="s"
              value={parent}
              options={conceptions}
              getOptionLabel={getItemLabel}
              onChange={(value) => {
                setParent(value);
              }}
              onCreate={(str: string) => {
                console.log(str);
              }}
            />
          </div>
        )}
        <div className={cnModal('Wrapper')}>
          <Text view="secondary" size="s" className={cnModal('Subtitle')}>
            Введите название концепции
          </Text>
          <TextField
            width="full"
            value={name}
            size="s"
            state={isEmpty(errors.name) ? undefined : 'alert'}
            onChange={({ value }) => setName(value ?? '')}
          />
        </div>
        <div className={cnModal('Wrapper')}>
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
            onChange={({ value }) => setDescription(value ?? '')}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className={cnModal('Footer')}>
        <Button
          className={cnModal('CancelButton').toString()}
          size="s"
          view="ghost"
          label="Отмена"
          onClick={() => {
            handleClose();
          }}
        />
        <Button
          size="s"
          view="primary"
          label="Создать"
          onClick={createNewConception}
        />
      </Modal.Footer>
    </Modal>
  );
});
