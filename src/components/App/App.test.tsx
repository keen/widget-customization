import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import { AppContext } from '../../contexts';
import App from './App';
import { MENU_ITEMS_ENUM } from '../../constants';

const render = (overProps: any = {}) => {
  const props = {
    chart: {},
    widget: {
      title: {},
      subtitle: {},
    },
    widgetType: 'bar',
    savedQueryName: '',
    onUpdateChartSettings: jest.fn(),
    onUpdateWidgetSettings: jest.fn(),
    customizationSections: {},
    onMenuItemChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={{ modalContainer: '#modal-root' }}>
      <App {...props} />
    </AppContext.Provider>
  );

  return {
    props,
    wrapper,
  };
};

test('Calls callback function on menu item change', () => {
  const onMenuItemChangeMock = jest.fn();

  const {
    wrapper: { getByText },
  } = render({
    onMenuItemChange: onMenuItemChangeMock,
  });

  const formattingMenuSection = getByText(
    'widget_customization_sections.formatting'
  );
  formattingMenuSection.click();
  expect(onMenuItemChangeMock).toBeCalledWith(MENU_ITEMS_ENUM.FORMATTING);
});
