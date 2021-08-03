/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  cleanup,
} from '@testing-library/react';

import AxesTitles from './AxesTitles';
import { AppContext } from '../../contexts';

const render = (overProps: any = {}) => {
  const props = {
    xAxisTitle: null,
    yAxisTitle: null,
    onUpdateAxesTitles: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={{ modalContainer: '#modal-root' }}>
      <AxesTitles {...props} />
    </AppContext.Provider>
  );

  return {
    props,
    wrapper,
  };
};

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
});

test('allows user to edit X axis title', () => {
  const {
    wrapper: { getByPlaceholderText },
    props,
  } = render();

  const input = getByPlaceholderText(
    'widget_customization_axis_settings.x_axis_title_placeholder'
  );
  fireEvent.change(input, { target: { value: '@axis-title' } });

  expect(props.onUpdateAxesTitles).toHaveBeenCalledWith({
    yAxisTitle: null,
    xAxisTitle: '@axis-title',
  });
});

test('allows user to edit Y axis title', () => {
  const {
    wrapper: { getByPlaceholderText },
    props,
  } = render();

  const input = getByPlaceholderText(
    'widget_customization_axis_settings.y_axis_title_placeholder'
  );
  fireEvent.change(input, { target: { value: '@axis-title' } });

  expect(props.onUpdateAxesTitles).toHaveBeenCalledWith({
    xAxisTitle: null,
    yAxisTitle: '@axis-title',
  });
});
