import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import LegendSettings from './LegendSettings';

const render = (overProps: any = {}) => {
  const props = {
    label: '@label',
    positionLabel: '@position-label',
    isEnabled: false,
    position: 'top',
    alignment: 'left',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<LegendSettings {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to enable legend', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const toggle = getByText('off');
  fireEvent.click(toggle);

  expect(props.onChange).toHaveBeenCalledWith({ enabled: true });
});

test('do not renders positon settings when legend is disabled', () => {
  const {
    wrapper: { queryByText },
  } = render();

  expect(queryByText('Bottom')).not.toBeInTheDocument();
});

test('do not renders alignment settings when legend is disabled', () => {
  const {
    wrapper: { queryByText },
  } = render();

  expect(queryByText('Center')).not.toBeInTheDocument();
});

test('allows user to set legend position', () => {
  const {
    wrapper: { getByText },
    props,
  } = render({ isEnabled: true });

  const positionElement = getByText('Bottom');
  fireEvent.click(positionElement);

  expect(props.onChange).toHaveBeenCalledWith({
    position: 'bottom',
    layout: 'horizontal',
  });
});

test('allows user to set legend alignment', () => {
  const {
    wrapper: { getByText },
    props,
  } = render({ isEnabled: true });

  const positionElement = getByText('Center');
  fireEvent.click(positionElement);

  expect(props.onChange).toHaveBeenCalledWith({ alignment: 'center' });
});

test('do not renders alignment options when alignment is not provided', () => {
  const {
    wrapper: { queryByText },
  } = render({ alignment: undefined, isEnabled: true });

  expect(queryByText('Center')).not.toBeInTheDocument();
});
