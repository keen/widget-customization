import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import ValueMode from './ValueMode';

const render = (overProps: any = {}) => {
  const props = {
    label: '@label',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<ValueMode {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to set legend position', () => {
  const {
    wrapper: { getByText },
    props,
  } = render({ isEnabled: true });

  const valueModeElement = getByText('Numeric');
  fireEvent.click(valueModeElement);

  expect(props.onChange).toHaveBeenCalledWith({
    valueMode: 'numeric',
  });
});
