/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import HeatmapSettings from '././Heatmap';

const render = (overProps: any = {}) => {
  const props = {
    hiddenOptions: {
      card: true,
    },
    widgetSettings: {
      legend: {},
    },
    chartSettings: {},
    ...overProps,
  };

  const wrapper = rtlRender(<HeatmapSettings {...props} />);

  return {
    props,
    wrapper,
  };
};

test('do not renders card settings when card settings disabled', () => {
  const {
    wrapper: { queryByTestId },
  } = render();

  const element = queryByTestId('card-settings');
  expect(element).not.toBeInTheDocument();
});

test('renders reverse axis settings', () => {
  const {
    wrapper: { getByText },
  } = render();

  const element = getByText('widget_customization_reverse_axes_settings.label');
  expect(element).toBeInTheDocument();
});

test('renders slider settings', () => {
  const {
    wrapper: { getByText },
  } = render();

  const element = getByText('widget_customization_slider_settings.label');
  expect(element).toBeInTheDocument();
});
