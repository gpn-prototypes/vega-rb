import React from 'react';
import { action } from '@storybook/addon-actions';

import { ConceptionsModal } from './index';

export default {
  title: 'Conceptions/Modals/New conception',
};

export const Default: React.FC = () => {
  return (
    <ConceptionsModal
      isOpen
      portal={null}
      handleClose={() => action('Close')}
      conceptions={[]}
      onSuccess={() => action('Conception has been created')}
    />
  );
};
