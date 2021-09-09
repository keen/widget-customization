import React from 'react';
import {
  act,
  waitFor,
  fireEvent,
  render as rtlRender,
} from '@testing-library/react';
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

test('renders notification about selecting column', async () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(
    getByText(
      'widget_customization_format_value_settings.click_on_columns_to_select_data'
    )
  ).toBeInTheDocument();
});

test('allows user to specify column format', async () => {
  const {
    chartEvents,
    props: { onUpdateFormatValue },
    wrapper: { getByTestId },
  } = render();
  const columnsSelection: ColumnSelection[] = [
    { name: '@column/01', dataType: 'string', formatter: null },
  ];

  act(() => {
    chartEvents.publish({
      eventName: '@table/columns-selected',
      meta: { selection: columnsSelection },
    });
  });

  await waitFor(() => getByTestId('input-prefix'));

  const prefixInput = getByTestId('input-prefix');

  act(() => {
    fireEvent.change(prefixInput, { target: { value: '@prefix' } });
  });

  await waitFor(() => {
    expect(onUpdateFormatValue).toBeCalledWith({
      '@column/01': '@prefix${string}',
    });
  });
});

test('allows user to rename column', async () => {
  const {
    chartEvents,
    props: { onUpdateColumnName },
    wrapper: { getByTestId },
  } = render();
  const columnsSelection: ColumnSelection[] = [
    { name: '@column/01', dataType: 'string', formatter: null },
  ];

  act(() => {
    chartEvents.publish({
      eventName: '@table/columns-selected',
      meta: { selection: columnsSelection },
    });
  });

  await waitFor(() => getByTestId('column-name-input'));

  const columnNameInput = getByTestId('column-name-input');

  act(() => {
    fireEvent.change(columnNameInput, { target: { value: '@column/rename' } });
  });

  await waitFor(() => {
    expect(onUpdateColumnName).toBeCalledWith('@column/01', '@column/rename');
  });
});

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
