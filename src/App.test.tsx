import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
  test('Just testing render component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.App')).toBeTruthy();
  });
});
