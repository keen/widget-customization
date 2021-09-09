/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  cleanup,
} from '@testing-library/react';

import { AppContext } from '../../../../contexts';
import FormatNumericSettings from './FormatNumericSettings';

const render = (overProps: any = {}) => {
  const props = {
    formatValue: null,
    onUpdateFormatValue: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={{ modalContainer: '#modal-root' }}>
      <FormatNumericSettings {...props} />
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

test('renders section title', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(
    getByText('widget_customization_format_value_settings.section_title')
  ).toBeInTheDocument();
});

test('renders section description', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(
    getByText('widget_customization_format_value_settings.section_description')
  ).toBeInTheDocument();
});

test('allows user to clear formatting settings', () => {
  const {
    props,
    wrapper: { getByText },
  } = render();

  const button = getByText('widget_customization_section.clear_button');
  fireEvent.click(button);

  expect(props.onUpdateFormatValue).toHaveBeenCalledWith(null);
});

test('do not allows user to clear settings when formatting is not available', () => {
  const {
    wrapper: { queryByText },
  } = render({ isDisabled: true });

  expect(
    queryByText('widget_customization_section.clear_button')
  ).not.toBeInTheDocument();
});
