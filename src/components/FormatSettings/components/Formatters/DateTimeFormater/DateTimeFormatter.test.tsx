import React from 'react';
import {
  cleanup,
  fireEvent,
  render as rtlRender,
  waitFor,
} from '@testing-library/react';
import { KEYBOARD_KEYS } from '@keen.io/ui-core';

import DateTimeFormatter from './DateTimeFormatter';
import { AppContext } from '../../../../../contexts';
import { DateTimeFormatter as DateTimeFormatterType } from '../../../../../types';
import { createFormatterSettings } from '../../../../../utils';

const formatter = 'prefix${datetime;YYYY-MM-DD;HH:mm}suffix';

const render = (overProps: any = {}) => {
  const props = {
    formatValue: formatter,
    onUpdateFormatValue: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={{ modalContainer: '#modal-root' }}>
      <DateTimeFormatter {...props} />
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

test('applies date formatters to selects', async () => {
  const { prefix, suffix } = createFormatterSettings(
    formatter,
    'number'
  ) as DateTimeFormatterType;

  const {
    wrapper: { getByText, getByTestId },
  } = render();

  const inputPrefix = getByTestId('input-prefix').getAttribute('value');
  const inputSuffix = getByTestId('input-suffix').getAttribute('value');
  expect(inputPrefix).toEqual(prefix);
  expect(inputSuffix).toEqual(suffix);
  expect(
    getByText('widget_customization_date_formats.YYYY-MM-DD')
  ).toBeInTheDocument();
  expect(
    getByText('widget_customization_time_formats.24-hour-clock')
  ).toBeInTheDocument();
});

test('supports keyboard navigation on date dropdown', async () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const element = getByText('widget_customization_date_formats.YYYY-MM-DD');
  fireEvent.keyDown(element, {
    key: 'Enter',
    keyCode: KEYBOARD_KEYS.ENTER,
  });
  fireEvent.keyDown(element, {
    key: 'ArrowDown',
    keyCode: KEYBOARD_KEYS.DOWN,
  });
  fireEvent.keyDown(element, {
    key: 'ArrowDown',
    keyCode: KEYBOARD_KEYS.DOWN,
  });
  fireEvent.keyDown(element, {
    key: 'Enter',
    keyCode: KEYBOARD_KEYS.ENTER,
  });

  await waitFor(() => {
    expect(props.onUpdateFormatValue).toHaveBeenCalledWith(
      'prefix${datetime;MM-DD-YYYY;  HH:mm}suffix'
    );
  });
});
