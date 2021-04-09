/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  cleanup,
} from '@testing-library/react';

import FormatSettings from './FormatSettings';
import { AppContext } from '../../contexts';

const render = (overProps: any = {}) => {
  const props = {
    formatValue: null,
    onUpdateFormatValue: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={{ modalContainer: '#modal-root' }}>
      <FormatSettings {...props} />
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
  const formattingNotAvailable = '@formattingNotAvailable';
  const {
    wrapper: { queryByText },
  } = render({ formattingNotAvailable });

  expect(
    queryByText('widget_customization_section.clear_button')
  ).not.toBeInTheDocument();
});

test('renders message when formatting settings are not available', () => {
  const formattingNotAvailable = '@formattingNotAvailable';
  const {
    wrapper: { getByText },
  } = render({ formattingNotAvailable });

  expect(getByText(formattingNotAvailable)).toBeInTheDocument();
});

test('renders tooltip when formatting settings are disabled', () => {
  const formattingDisabled = '@formattingDisabled';
  const {
    wrapper: { getByTestId, getByText },
  } = render({ formattingDisabled });

  const element = getByTestId('settings-container');
  fireEvent.mouseEnter(element);

  expect(getByText(formattingDisabled)).toBeInTheDocument();
});
