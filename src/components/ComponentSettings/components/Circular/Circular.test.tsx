import React from 'react';
import { render as rtlRender, fireEvent, within } from '@testing-library/react';

import CircularSettings from './Circular';

const render = (overProps: any = {}) => {
  const props = {
    chartSettings: {
      formatValue: null,
      funnelPercentages: false,
    },
    widgetSettings: {
      legend: {
        enabled: true,
      },
      card: {
        enabled: false,
      },
    },
    onUpdateChartSettings: jest.fn(),
    onUpdateWidgetSettings: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<CircularSettings {...props} />);

  return {
    props,
    wrapper,
  };
};

test('do not renders card settings when card settings are disabled', () => {
  const props = {
    hiddenOptions: {
      card: true,
    },
    widgetSettings: {
      legend: {},
    },
    chartSettings: {},
  };
  const {
    wrapper: { queryByTestId },
  } = render(props);

  const element = queryByTestId('circular-card');
  expect(element).not.toBeInTheDocument();
});

test('allows user to enable card component', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('circular-card');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateWidgetSettings).toHaveBeenCalledWith({
    ...props.widgetSettings,
    card: {
      enabled: true,
    },
  });
});
