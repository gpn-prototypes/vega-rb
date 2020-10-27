import React from 'react';
import { action } from '@storybook/addon-actions';

import { ProbabilitiesModal } from './index';

export default {
  title: 'Conceptions/Modals/New conception',
};

export const Default: React.FC = () => {
  return (
    <ProbabilitiesModal
      isOpen
      portal={null}
      handleClose={() => action('Close')}
      conceptionsList={[]}
      onSuccess={() => action('Success')}
    />
  );
};
