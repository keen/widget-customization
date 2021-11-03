import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { KEYBOARD_KEYS } from '@keen.io/ui-core';

import NumericFormatter from './NumericFormatter';
import { createFormatterSettings } from '../../../../../utils';
import { BASIC_FORMATTER_PATTERN } from '../../../../../constants';

import { OPERATIONS_OPTIONS } from './constants';
import { NumericFormatter as NumericFormatterType } from '../../../../../types';

const render = (overProps: any = {}) => {
  const props = {
    onUpdateFormatValue: jest.fn(),
    formatValue: null,
    ...overProps,
  };

  const wrapper = rtlRender(<NumericFormatter {...props} />);

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
    formatter,
    'number'
  ) as NumericFormatterType;

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

test('supports keyboard navigation on precision dropdown', async () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const element = getByText(
    'widget_customization_format_value_settings.original_data'
  );
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
    expect(props.onUpdateFormatValue).toHaveBeenCalledWith('${number; 0.0}');
  });
});

test('thousands separator is disabled when precision is not set', () => {
  const formatter = null;
  const {
    wrapper: { getByTestId },
  } = render({ formatValue: formatter });

  const separatorContainer = getByTestId('separator');
  const separatorCheckbox = separatorContainer.querySelector(
    'input[type="checkbox"]'
  );
  expect(separatorCheckbox).toBeDisabled();
});

test('thousands separator is enabled when precision is set', () => {
  const formatter = `prefix\$\{number; 0.0; ${OPERATIONS_OPTIONS[1].value}; 10\}suffix`;
  const {
    wrapper: { getByTestId },
  } = render({ formatValue: formatter });

  const separatorContainer = getByTestId('separator');
  const separatorCheckbox = separatorContainer.querySelector(
    'input[type="checkbox"]'
  );
  expect(separatorCheckbox).not.toBeDisabled();
});

test('Shows tooltip when comma typed inside the input', async () => {
  const {
    wrapper: { getByTestId },
  } = render();

  const input = getByTestId('input-prefix');
  const inputValue = '12,';

  act(() => {
    fireEvent.change(input, { target: { value: inputValue } });
    fireEvent.blur(input);
  });

  await waitFor(() => {
    const validationTooltip = getByTestId('validation-tooltip');
    expect(validationTooltip).toHaveStyle('opacity: 0;');
  });
});
