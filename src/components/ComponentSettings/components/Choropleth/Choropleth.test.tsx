import React from 'react';
import { render as rtlRender, fireEvent, within } from '@testing-library/react';

import ChoroplethSettings from './Choropleth';

const render = (overProps: any = {}) => {
  const props = {
    widgetSettings: {
      card: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
    },
    onUpdateWidgetSettings: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<ChoroplethSettings {...props} />);

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

  const section = getByTestId('choropleth-card');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateWidgetSettings).toHaveBeenCalledWith({
    ...props.widgetSettings,
    card: {
      enabled: true,
    },
  });
});

test('allows user to enable slider', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const section = getByTestId('choropleth-slider');
  const toggle = within(section).getByText('off');

  fireEvent.click(toggle);

  expect(props.onUpdateWidgetSettings).toHaveBeenCalledWith({
    ...props.widgetSettings,
    legend: {
      enabled: true,
    },
  });
});
