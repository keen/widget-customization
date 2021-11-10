import { fireEvent, render as rtlRender, within } from '@testing-library/react';
import React from 'react';

import Table from './Table';

const render = (overProps: any = {}) => {
  const props = {
    hiddenOptions: {
      card: true,
    },
    widgetSettings: {},
    chartSettings: {},
    ...overProps,
    onUpdateChartSettings: jest.fn(),
  };

  const wrapper = rtlRender(<Table {...props} />);

  return {
    props,
    wrapper,
  };
};

test('do not renders card settings when card settings are disabled', () => {
  const {
    wrapper: { queryByTestId },
  } = render();

  const element = queryByTestId('card-settings');
  expect(element).not.toBeInTheDocument();
});

test('allows user to enable rows selection', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('table-selectable-rows');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateChartSettings).toHaveBeenCalledWith({
    ...props.chartSettings,
    rowsSelection: true,
  });
});
