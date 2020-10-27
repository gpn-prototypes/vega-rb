/* eslint-disable */
// @ts-nocheck
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, useModal, usePortal } from '@gpn-prototypes/vega-ui';
import { ConceptionModalTypes } from 'components/Conceptions/Modals/types';
import { sortBy } from 'lodash/fp';
import conceptionsDuck from 'store/conceptionsDuck';
import { RootState } from 'store/types';
import { Conception } from 'types';
// import { KeyFilter } from 'react-use/lib/useKey';
import { noop } from 'utils';

import DescriptionModal from './Modals/DescriptionModal/DescriptionModal';
import { Calculations } from './Calculations';
import { cnConceptions } from './cn-conceptions';
import { ConceptionContextMenu } from './ConceptionContextMenu';
import { ConceptionsList } from './ConceptionsList';
import { Fluids } from './Fluids';
import { ConceptionsModal, ProbabilitiesModal } from './Modals';
import { CONCEPTIONS_CONTEXT_ID } from './types';

import './Conceptions.css';

// const keyFilter: KeyFilter = ({ key, altKey }) => altKey && key === 'Enter';

export default React.memo(function Conceptions(props) {
  const [modalType, setModalType] = useState(ConceptionModalTypes.CALCULATION);
  const { isOpen, close: handleClose, open: handleOpen } = useModal({
    initialOpen: false,
  });
  const [targetedConception, setTargetedConception] = useState<Conception>(
    {} as Conception,
  );

  const { portal } = usePortal();
  const dispatch = useDispatch();
  const { conceptionsList, activeConception } = useSelector(
    ({ conceptions }: RootState) => ({
      conceptionsList: sortBy(['created'], conceptions.list),
      activeConception: conceptions.active,
    }),
  );

  const onDeleteHandler = (conception: Conception) => {
    dispatch(conceptionsDuck.actions.deleteConception(conception));
  };

  const onSetActiveHandler = (id: string) => {
    dispatch(conceptionsDuck.actions.setActiveConception(id));
  };

  const isModalOpen = (type: ConceptionModalTypes): boolean =>
    isOpen && modalType === type;

  const openModal = (type: ConceptionModalTypes) => {
    setModalType(type);
    handleOpen();
  };

  // const onCalculateHandler = (event: MSGestureEvent) => {
  //   showMenu({
  //     id: CONCEPTIONS_CONTEXT_ID,
  //     target: event.target as HTMLElement,
  //     position: {
  //       x: event.clientX,
  //       y: event.clientY,
  //     },
  //   });
  // };

  // useKeyPressEvent(keyFilter);

  const Modals = (
    <>
      <ConceptionsModal
        portal={portal}
        handleClose={handleClose}
        isOpen={isModalOpen(ConceptionModalTypes.CONCEPTION)}
        onSuccess={(conception: Conception) => {
          dispatch(conceptionsDuck.actions.createConception(conception));
        }}
        conceptions={conceptionsList}
      />
      <ProbabilitiesModal
        portal={portal}
        handleClose={handleClose}
        isOpen={isModalOpen(ConceptionModalTypes.CALCULATION)}
        onSuccess={(conception) => {
          dispatch(conceptionsDuck.actions.updateConception(conception));
        }}
        conceptionsList={conceptionsList}
      />
      <DescriptionModal
        portal={portal}
        onClose={handleClose}
        isOpen={isModalOpen(ConceptionModalTypes.DESCRIPTION)}
        onSuccess={handleClose}
        conception={targetedConception}
      />
    </>
  );

  return (
    <div className={cnConceptions()}>
      <Text size="s" weight="bold">
        Ресурсная база и риски
      </Text>
      <ConceptionsList
        onCreateConception={() => openModal(ConceptionModalTypes.CONCEPTION)}
        setActive={onSetActiveHandler}
        conceptionsData={conceptionsList}
        activeConception={activeConception}
      />
      <Fluids />
      <Calculations onSuccess={noop} />
      <Text size="xs" view="ghost" align="center">
        Alt + Enter
      </Text>
      {Modals}
      <ConceptionContextMenu
        id={CONCEPTIONS_CONTEXT_ID}
        isDeletable={conceptionsList.length > 1}
        onDelete={(event, { idx: conception }) => onDeleteHandler(conception)}
        onSetProbability={() => openModal(ConceptionModalTypes.CALCULATION)}
        onShowDescription={(event, { idx: conception }) => {
          setTargetedConception(conception);
          openModal(ConceptionModalTypes.DESCRIPTION);
        }}
      />
    </div>
  );
});
