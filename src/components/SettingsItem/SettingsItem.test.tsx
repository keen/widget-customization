import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import SettingsItem from './SettingsItem';

const render = (overProps: any = {}) => {
  const props = {
    label: 'Option',
    isEnabled: false,
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<SettingsItem {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to enable settings item', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const toggle = getByText('off');

  fireEvent.click(toggle);

  expect(props.onChange).toHaveBeenCalledWith(true);
});
