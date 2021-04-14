import { PickerWidgets } from '@keen.io/widget-picker';

export const HEADING_DISABLED_WIDGETS: PickerWidgets[] = ['metric', 'json'];

export const FORMAT_VALUES_DISABLED_WIDGETS: PickerWidgets[] = [
  'table',
  'json',
];

export const SUPPORTED_FORMATTER_PATTERNS = [
  '0',
  '0.0',
  '0.00',
  '0.000',
  '0.0000',
  '0.00000',
  '0.000000',
];

export const OPERATIONS = ['add', 'subtract', 'multiply', 'divide'];

export const DEFAULT_FORMATTER_PATTERN = {
  label: 'widget_customization_format_value_settings.original_data',
  value: '-',
};

export const BASIC_FORMATTER_PATTERN = '${number}';
