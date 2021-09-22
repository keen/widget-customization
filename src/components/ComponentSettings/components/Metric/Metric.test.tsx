import React from 'react';
import { fireEvent, render as rtlRender, within } from '@testing-library/react';
import MetricSettings from './Metric';

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

  const wrapper = rtlRender(<MetricSettings {...props} />);

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

test('allows user to enable icon', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('display-icon');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateChartSettings).toHaveBeenCalledWith({
    ...props.chartSettings,
    iconEnabled: true,
  });
});

test('allows user to select icon style', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({ chartSettings: { iconEnabled: true } });

  const section = getByTestId('icon-style');
  const toggle = within(section).getByText('Solid');

  fireEvent.click(toggle);

  expect(props.onUpdateChartSettings).toHaveBeenCalledWith({
    ...props.chartSettings,
    iconStyle: 'solid',
  });
});
