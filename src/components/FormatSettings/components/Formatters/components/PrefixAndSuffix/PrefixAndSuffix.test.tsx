/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import { AppContext } from '../../../../../../contexts';
import PrefixAndSuffix from './PrefixAndSuffix';

const render = (overProps: any = {}) => {
  const props = {
    onChange: jest.fn(),
    prefix: '',
    suffix: '',
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={{ modalContainer: '#modal-root' }}>
      <PrefixAndSuffix {...props} />
    </AppContext.Provider>
  );

  return {
    props,
    wrapper,
  };
};

test('calls on change on prefix format', () => {
  const onChangeMock = jest.fn();

  const {
    wrapper: { getByTestId },
  } = render({ onChange: onChangeMock });

  const prefixInput = getByTestId('input-prefix');
  fireEvent.change(prefixInput, { target: { value: '$' } });
  expect(onChangeMock).toBeCalledWith({ prefix: '$', suffix: '' });
});

test('calls on change on suffix format', () => {
  const onChangeMock = jest.fn();

  const {
    wrapper: { getByTestId },
  } = render({ onChange: onChangeMock });

  const prefixInput = getByTestId('input-suffix');
  fireEvent.change(prefixInput, { target: { value: '$' } });
  expect(onChangeMock).toBeCalledWith({ prefix: '', suffix: '$' });
});
