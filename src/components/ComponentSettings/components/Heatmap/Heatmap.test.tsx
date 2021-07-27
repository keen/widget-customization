/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { render as rtlRender, fireEvent, within } from '@testing-library/react';
import HeatmapSettings from '././Heatmap';

const render = (overProps: any = {}) => {
  const props = {
    chartSettings: {
      formatValue: null,
      layout: 'vertical',
    },
    widgetSettings: {
      legend: {
        enabled: false,
      },
      card: {
        enabled: false,
      },
    },
    onUpdateChartSettings: jest.fn(),
    onUpdateWidgetSettings: jest.fn(),
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
  } = render({
    hiddenOptions: {
      card: true,
    },
  });

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

test('allows user to enable card component', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('heatmap-card');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateWidgetSettings).toHaveBeenCalledWith({
    ...props.widgetSettings,
    card: {
      enabled: true,
    },
  });
});

test('allows user to enable reverse axe', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('heatmap-axes');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateChartSettings).toHaveBeenCalledWith({
    ...props.chartSettings,
    layout: 'horizontal',
  });
});
