/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import {
  cleanup,
  fireEvent,
  render as rtlRender,
} from '@testing-library/react';
import FormatSettings from './FormatSettings';
import { AppContext } from '../../contexts';

const render = (overProps: any = {}) => {
  const props = {
    onUpdateFormatValue: jest.fn(),
    chartSettings: {
      formatValue: null,
    },
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

test('renders message when formatting settings are not available', () => {
  const formattingNotAvailable = '@formattingNotAvailable';
  const {
    wrapper: { getByText },
  } = render({ formattingNotAvailable: formattingNotAvailable });

  expect(getByText(formattingNotAvailable)).toBeInTheDocument();
});

test('renders tooltip when formatting settings are disabled', () => {
  const formattingDisabled = '@formattingDisabled';
  const {
    wrapper: { getByTestId, getByText },
  } = render({ formattingDisabled: formattingDisabled });

  const element = getByTestId('settings-container');
  fireEvent.mouseEnter(element);

  expect(getByText(formattingDisabled)).toBeInTheDocument();
});
