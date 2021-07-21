import React from 'react';
import { render as rtlRender, fireEvent, within } from '@testing-library/react';

import GridSettings from './GridSettings';

const render = (overProps: any = {}) => {
  const props = {
    verticalGrid: false,
    horizontalGrid: false,
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<GridSettings {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to enable vertical grid', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('vertical-grid');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onChange).toHaveBeenCalledWith({ verticalGrid: true });
});

test('allows user to enable horizontal grid', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('horizontal-grid');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onChange).toHaveBeenCalledWith({ horizontalGrid: true });
});
