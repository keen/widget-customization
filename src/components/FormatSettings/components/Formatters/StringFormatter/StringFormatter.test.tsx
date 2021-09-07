import React from 'react';
import {
  act,
  waitFor,
  render as rtlRender,
  fireEvent,
} from '@testing-library/react';

import StringFormatter from './StringFormatter';
import { createFormatterSettings } from '../../../../../utils';

import { StringFormatter as StringFormatterType } from '../../../../../types';

const render = (overProps: any = {}) => {
  const props = {
    onUpdateFormatValue: jest.fn(),
    formatValue: null,
    ...overProps,
  };

  const wrapper = rtlRender(<StringFormatter {...props} />);

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

test('serializes "srting" formatter pattern as component values', () => {
  const formatter = `@prefix\${string}@suffix`;

  const { prefix, suffix } = createFormatterSettings(
    formatter,
    'string'
  ) as StringFormatterType;

  const {
    wrapper: { getByTestId },
  } = render({ formatValue: formatter });

  const inputPrefix = getByTestId('input-prefix').getAttribute('value');
  const inputSuffix = getByTestId('input-suffix').getAttribute('value');

  expect(inputPrefix).toEqual(prefix);
  expect(inputSuffix).toEqual(suffix);
});

test('allows user to specify prefix for "string" property', async () => {
  const {
    props: { onUpdateFormatValue },
    wrapper: { getByTestId },
  } = render();

  const prefixInput = getByTestId('input-prefix');

  act(() => {
    fireEvent.change(prefixInput, { target: { value: '@prefix' } });
  });

  await waitFor(() => {
    expect(onUpdateFormatValue).toBeCalledWith('@prefix${string}');
  });
});

test('allows user to specify suffix for "string" property', async () => {
  const {
    props: { onUpdateFormatValue },
    wrapper: { getByTestId },
  } = render();

  const prefixInput = getByTestId('input-suffix');

  act(() => {
    fireEvent.change(prefixInput, { target: { value: '@suffix' } });
  });

  await waitFor(() => {
    expect(onUpdateFormatValue).toBeCalledWith('${string}@suffix');
  });
});
