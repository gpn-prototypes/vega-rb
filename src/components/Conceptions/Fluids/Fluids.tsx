import React from 'react';
import { Text } from '@gpn-prototypes/vega-ui';
import { cnConceptions } from 'components/Conceptions/cn-conceptions';

export default React.memo(function Fluids(props) {
  return (
    <Text
      size="xs"
      view="secondary"
      className={cnConceptions('Title').toString()}
    >
      Флюид
    </Text>
  );
});
