import React from 'react';
import { Button, IconAdd, NavigationList, Text } from '@gpn-prototypes/vega-ui';
import { eq } from 'lodash/fp';
import { Conception, NoopFunction } from 'types';

import { cnConceptions } from '../cn-conceptions';
import { ConceptionItem } from '../ConceptionItem';

interface IProps {
  activeConception: string;
  onCreateConception: NoopFunction;
  setActive: (id: string) => void;
  conceptionsData: Conception[];
}

const ConceptionsList: React.FC<IProps> = ({
  activeConception,
  onCreateConception,
  setActive,
  conceptionsData,
}) => {
  return (
    <>
      <Text
        size="xs"
        view="secondary"
        className={cnConceptions('Title').toString()}
      >
        Геологическая концепция
      </Text>
      <NavigationList>
        {conceptionsData.map((itemProps) => (
          <ConceptionItem
            key={itemProps.id}
            setActive={setActive}
            isActive={eq(itemProps.id, activeConception)}
            {...itemProps}
          />
        ))}
      </NavigationList>
      <Button
        size="xs"
        label="Новая концепция"
        view="clear"
        iconLeft={IconAdd}
        onClick={onCreateConception}
      />
    </>
  );
};

export default ConceptionsList;
