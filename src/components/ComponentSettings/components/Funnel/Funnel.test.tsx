import React from 'react';
import { render as rtlRender, fireEvent, within } from '@testing-library/react';

import FunnelSettings from './Funnel';

const render = (overProps: any = {}) => {
  const props = {
    chartSettings: {
      formatValue: null,
      funnelPercentages: false,
    },
    widgetSettings: {
      card: {
        enabled: false,
      },
    },
    onUpdateChartSettings: jest.fn(),
    onUpdateWidgetSettings: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<FunnelSettings {...props} />);

  return {
    props,
    wrapper,
  };
};

test('allows user to enable card component', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('card-settings');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateWidgetSettings).toHaveBeenCalledWith({
    ...props.widgetSettings,
    card: {
      enabled: true,
    },
  });
});

test('allows user to enable percentage values', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('funnel-percentages');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateChartSettings).toHaveBeenCalledWith({
    ...props.chartSettings,
    funnelPercentages: true,
  });
});
