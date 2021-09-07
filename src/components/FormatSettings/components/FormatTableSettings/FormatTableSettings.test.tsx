import React from 'react';
import { act, waitFor, render as rtlRender } from '@testing-library/react';
import { ChartEvents, TableEvents, ColumnSelection } from '@keen.io/charts';
import { PubSub } from '@keen.io/pubsub';

import { AppContext } from '../../../../contexts';

import FormatTableSettings from './FormatTableSettings';

const render = (overProps: any = {}) => {
  const pubSub = new PubSub();
  const props = {
    onUpdateFormatValue: jest.fn(),
    onUpdateColumnName: jest.fn(),
    columnsNamesMapping: {},
    ...overProps,
  };

  const chartEvents = new ChartEvents<TableEvents>({ pubsub: pubSub });

  const wrapper = rtlRender(
    <AppContext.Provider value={{ pubSub }}>
      <FormatTableSettings {...props} />
    </AppContext.Provider>
  );

  return {
    props,
    wrapper,
    chartEvents,
  };
};

test('renders notification about inconsistent columns types', async () => {
  const {
    chartEvents,
    wrapper: { getByTestId },
  } = render();
  const columnsSelection: ColumnSelection[] = [
    { name: '@column/01', dataType: 'string', formatter: null },
    { name: '@column/02', dataType: 'number', formatter: null },
  ];

  act(() => {
    chartEvents.publish({
      eventName: '@table/columns-selected',
      meta: { selection: columnsSelection },
    });
  });

  await waitFor(() => {
    expect(getByTestId('columns-format-notification')).toBeInTheDocument();
  });
});

test('renders notification about not supported "boolean" type', async () => {
  const {
    chartEvents,
    wrapper: { getByText },
  } = render();
  const columnsSelection: ColumnSelection[] = [
    { name: '@column/01', dataType: 'boolean', formatter: null },
  ];

  act(() => {
    chartEvents.publish({
      eventName: '@table/columns-selected',
      meta: { selection: columnsSelection },
    });
  });

  await waitFor(() => {
    expect(
      getByText(
        'widget_customization_format_value_settings.boolean_not_supported'
      )
    ).toBeInTheDocument();
  });
});
