/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import BarSettings from './Bar';

const render = (overProps: any = {}) => {
  const props = {
    componentSettingsConfig: {
      cardSettingsDisabled: true,
    },
    widgetSettings: {
      legend: {},
    },
    chartSettings: {},
    ...overProps,
  };

  const wrapper = rtlRender(<BarSettings {...props} />);

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
