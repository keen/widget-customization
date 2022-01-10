import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import RowsPerPage from './RowsPerPage';

const render = (overProps: any = {}) => {
  const props = {
    rowsPerPage: 20,
    onChange: jest.fn(),
    isPaginationEnabled: false,
    ...overProps,
  };

  const wrapper = rtlRender(<RowsPerPage {...props} />);

  return {
    props,
    wrapper,
  };
};

test('show information about decreased table performance when pagination is disabled', () => {
  const {
    wrapper: { queryByText },
  } = render();

  const element = queryByText(
    'widget_customization_table_settings.disabled_pagination_info'
  );
  expect(element).toBeInTheDocument();
});

test('shows rows per page select when pagination is enabled', () => {
  const {
    wrapper: { getByTestId },
  } = render({
    isPaginationEnabled: true,
  });

  const element = getByTestId('rows-per-page-select');
  expect(element).toBeInTheDocument();
});
