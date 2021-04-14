import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';

import FormatValues from './FormatValues';

import { createFormatterSettings } from '../../utils';
import { OPERATIONS_OPTIONS } from './constants';
import { BASIC_FORMATTER_PATTERN } from '../../constants';

const render = (overProps: any = {}) => {
  const props = {
    onUpdateFormatValue: jest.fn(),
    formatValue: null,
    ...overProps,
  };

  const wrapper = rtlRender(<FormatValues {...props} />);

  return {
    props,
    wrapper,
  };
};

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

test('renders formatter options', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(
    getByText('widget_customization_format_value_settings.original_data')
  ).toBeInTheDocument();
});

test('renders options from formatter', () => {
  const formatter = `prefix\$\{number; 0.0; ${OPERATIONS_OPTIONS[1].value}; 10\}suffix`;
  const { prefix, suffix, precision, value } = createFormatterSettings(
    formatter
  );
  const {
    wrapper: { getByText, getByTestId },
  } = render({ formatValue: formatter });

  const inputPrefix = getByTestId('input-prefix').getAttribute('value');
  const inputSuffix = getByTestId('input-suffix').getAttribute('value');
  const inputValue = getByTestId('input-value').getAttribute('value');

  expect(getByText(OPERATIONS_OPTIONS[1].label)).toBeInTheDocument();
  expect(getByText(precision)).toBeInTheDocument();
  expect(inputPrefix).toEqual(prefix);
  expect(inputSuffix).toEqual(suffix);
  expect(inputValue).toEqual(value);
});

test('calls onUpdateFormatValue on value change', async () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const input = getByTestId('input-prefix');
  const inputValue = '@prefix';

  act(() => {
    fireEvent.change(input, { target: { value: inputValue } });
    fireEvent.blur(input);
  });

  await waitFor(() => {
    expect(props.onUpdateFormatValue).toHaveBeenCalledWith(
      `${inputValue}${BASIC_FORMATTER_PATTERN}`
    );
  });
});
