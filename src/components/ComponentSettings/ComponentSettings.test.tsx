import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import ComponentSettings from './ComponentSettings';

const render = (overProps: any = {}) => {
  const props = {
    widgetType: '',
    chartSettings: '',
    widgetSettings: {},
    onUpdateWidgetSettings: jest.fn(),
    onUpdateChartSettings: jest.fn(),
    componentSettingsConfig: {},
    ...overProps,
  };

  const wrapper = rtlRender(<ComponentSettings {...props} />);

  return {
    props,
    wrapper,
  };
};

test('displays info message when widget type is not provided', () => {
  const {
    wrapper: { getByText },
  } = render();

  const noSettingsMessage = getByText(
    'widget_customization.chart_settings_not_available'
  );
  expect(noSettingsMessage).toBeInTheDocument();
});

test('displays info message when no available settings for widget', () => {
  const {
    wrapper: { getByText },
  } = render({
    widgetType: 'json',
  });

  const noSettingsMessage = getByText(
    'widget_customization.chart_settings_not_available_for_widget'
  );
  expect(noSettingsMessage).toBeInTheDocument();
});

test('does not display info message when widget type is provided and settings are available', () => {
  const {
    wrapper: { queryByText },
  } = render({
    widgetType: 'bar',
    widgetSettings: {
      card: {},
      legend: {},
    },
  });

  const noSettingsMessage = queryByText(
    'widget_customization.chart_settings_not_available'
  );
  const noSettingsForChartMessage = queryByText(
    'widget_customization.chart_settings_not_available_for_widget'
  );

  expect(noSettingsMessage).not.toBeInTheDocument();
  expect(noSettingsForChartMessage).not.toBeInTheDocument();
});
