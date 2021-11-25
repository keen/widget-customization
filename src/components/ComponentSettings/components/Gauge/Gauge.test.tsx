import { fireEvent, render as rtlRender } from '@testing-library/react';
import React from 'react';

import Gauge from './Gauge';

const render = (overProps: any = {}) => {
  const props = {
    chartSettings: {
      minValue: 10,
      maxValue: 200,
    },
    analysisResult: 100,
    onUpdateChartSettings: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<Gauge {...props} />);

  return {
    props,
    wrapper,
  };
};

test('should render result if provided', () => {
  const {
    wrapper: { getByText },
    props: { analysisResult },
  } = render();

  const element = getByText(
    'widget_customization_gauge_settings.current_value:'
  );
  const value = getByText(analysisResult);
  expect(element).toBeInTheDocument();
  expect(value).toBeInTheDocument();
});

test('should render inputs for values', () => {
  const {
    wrapper: { getByDisplayValue },
    props: {
      chartSettings: { maxValue, minValue },
    },
  } = render();

  const minValueInput = getByDisplayValue(minValue);
  const maxValueInput = getByDisplayValue(maxValue);

  expect(minValueInput).toBeInTheDocument();
  expect(maxValueInput).toBeInTheDocument();
});

test('should render validation message when minimum value is empty', () => {
  const {
    wrapper: { getByText, getByDisplayValue },
    props: {
      chartSettings: { minValue },
    },
  } = render();

  const input = getByDisplayValue(minValue);
  fireEvent.change(input, { target: { value: '' } });

  const validationMessage = getByText(
    'widget_customization_gauge_settings.validation_minimal_value'
  );
  expect(validationMessage).toBeInTheDocument();
});

test('should render validation message when target value is empty', () => {
  const {
    wrapper: { getByText, getByDisplayValue },
    props: {
      chartSettings: { maxValue },
    },
  } = render();

  const input = getByDisplayValue(maxValue);
  fireEvent.change(input, { target: { value: '' } });

  const validationMessage = getByText(
    'widget_customization_gauge_settings.validation_target_value'
  );
  expect(validationMessage).toBeInTheDocument();
});

test('should render validation message when target value is smaller than minimum value', () => {
  const {
    wrapper: { getByText, getByDisplayValue },
    props: {
      chartSettings: { maxValue, minValue },
    },
  } = render();

  const input = getByDisplayValue(maxValue);
  fireEvent.change(input, { target: { value: minValue - 1 } });

  const validationMessage = getByText(
    'widget_customization_gauge_settings.validation'
  );
  expect(validationMessage).toBeInTheDocument();
});

test('should render validation message when the user uses comma in a number field', () => {
  const {
    wrapper: { getByText, getByDisplayValue },
    props: {
      chartSettings: { maxValue },
    },
  } = render();

  const input = getByDisplayValue(maxValue);
  fireEvent.keyDown(input, { key: ',' });

  const validationMessage = getByText(
    'widget_customization_gauge_settings.validation_comma'
  );
  expect(validationMessage).toBeInTheDocument();
});

test('should call onUpdateChartSettings', () => {
  const {
    wrapper: { getByDisplayValue },
    props: {
      chartSettings: { maxValue },
      onUpdateChartSettings,
    },
  } = render();

  const input = getByDisplayValue(maxValue);
  fireEvent.change(input, { target: { value: maxValue + 10 } });

  expect(onUpdateChartSettings).toHaveBeenCalledWith(
    expect.objectContaining({
      maxValue: 210,
      minValue: 10,
    })
  );
});
