/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  cleanup,
} from '@testing-library/react';

import HeadingSettings from './HeadingSettings';
import { AppContext } from '../../contexts';

import { createHeadingSettings } from '../../utils';

const render = (overProps: any = {}) => {
  const { title, subtitle } = createHeadingSettings();

  const props = {
    onUpdateTitleSettings: jest.fn(),
    onUpdateSubtitleSettings: jest.fn(),
    title,
    subtitle,
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider value={{ modalContainer: '#modal-root' }}>
      <HeadingSettings {...props} />
    </AppContext.Provider>
  );

  return {
    props,
    wrapper,
    title,
    subtitle,
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

test('renders section title', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(
    getByText('widget_customization_heading_settings.section_title')
  ).toBeInTheDocument();
});

test('renders description', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(
    getByText('widget_customization_heading_settings.section_description')
  ).toBeInTheDocument();
});

test('renders tooltip with message when settings are disabled', () => {
  const settingsDisabled = '@settingsDisabled';
  const {
    wrapper: { getByTestId, getByText },
  } = render({ settingsDisabled });

  const element = getByTestId('settings-container');
  fireEvent.mouseEnter(element);

  expect(getByText(settingsDisabled)).toBeInTheDocument();
});

test('allows user to edit widget title', () => {
  const {
    wrapper: { getByPlaceholderText },
    props,
    title,
  } = render();

  const input = getByPlaceholderText(
    'widget_customization_heading_settings.title_placeholder'
  );
  fireEvent.change(input, { target: { value: '@title' } });

  expect(props.onUpdateTitleSettings).toHaveBeenCalledWith({
    ...title,
    content: '@title',
  });
});

test('allows user to edit widget subtitle', () => {
  const {
    wrapper: { getByPlaceholderText },
    props,
    subtitle,
  } = render();

  const input = getByPlaceholderText(
    'widget_customization_heading_settings.subtitle_placeholder'
  );
  fireEvent.change(input, { target: { value: '@subtitle' } });

  expect(props.onUpdateSubtitleSettings).toHaveBeenCalledWith({
    ...subtitle,
    content: '@subtitle',
  });
});
