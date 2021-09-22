import { PickerWidgets } from '@keen.io/widget-picker';

export const HEADING_DISABLED_WIDGETS: PickerWidgets[] = ['json'];

export const FORMAT_VALUES_DISABLED_WIDGETS: PickerWidgets[] = ['json'];

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

export enum MENU_ITEMS_ENUM {
  TITLES = 'titles',
  FORMATTING = 'formatting',
  CHART_ELEMENTS = 'chart_elements',
}

export const MENU_ITEMS = [
  {
    id: MENU_ITEMS_ENUM.TITLES,
    label: 'widget_customization_sections.titles',
  },
  {
    id: MENU_ITEMS_ENUM.FORMATTING,
    label: 'widget_customization_sections.formatting',
  },
  {
    id: MENU_ITEMS_ENUM.CHART_ELEMENTS,
    label: 'widget_customization_sections.components',
  },
];

export enum IconStyles {
  regular = 'regular',
  solid = 'solid',
}
