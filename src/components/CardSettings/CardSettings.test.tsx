import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import CardSettings from './CardSettings';

const render = (overProps: any = {}) => {
  const props = {
    isEnabled: false,
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<CardSettings {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to enable card', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const toggle = getByText('off');

  fireEvent.click(toggle);

  expect(props.onChange).toHaveBeenCalledWith(true);
});
