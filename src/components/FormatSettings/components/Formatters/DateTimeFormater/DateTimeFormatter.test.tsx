import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import DateTimeFormatter from './DateTimeFormatter';
import { AppContext } from '../../../../../contexts';
import { DateTimeFormatter as DateTimeFormatterType } from '../../../../../types';
import { createFormatterSettings } from '../../../../../utils';

const render = (overProps: any = {}) => {
  const props = {
    formatValue: '',
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

test('applies date formatters to selects', async () => {
  const formatter = 'prefix${datetime;YYYY-MM-DD;HH:mm}suffix';

  const { prefix, suffix } = createFormatterSettings(
    formatter,
    'number'
  ) as DateTimeFormatterType;

  const {
    wrapper: { getByText, getByTestId },
  } = render({ formatValue: formatter });

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
