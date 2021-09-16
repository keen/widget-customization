import { LegendSettings, TextSettings } from '@keen.io/widgets';
import { CardSettings, Layout } from '@keen.io/ui-core';
import { IconType } from '@keen.io/icons';

import { IconStyles } from './constants';

export type ChartCustomizationSettings = {
  formatValue?: string | null;
  verticalGrid?: boolean;
  horizontalGrid?: boolean;
  layout?: Layout;
  xAxisTitle?: string;
  yAxisTitle?: string;
  funnelPercentages?: boolean;
  valueMode?: CircularChartValueMode;
  columnsNamesMapping?: Record<string, string>;
  formatTableColumns?: Record<string, any>;
  iconEnabled?: boolean;
  iconStyle?: IconStyles;
  iconType?: IconType;
};

export type WidgetCustomizationSettings = {
  title: TextSettings;
  subtitle: TextSettings;
  legend: Partial<LegendSettings>;
  card: Partial<CardSettings>;
};

export type HiddenOptions = {
  card: boolean;
};

export type ComponentSettings = {
  isDisabled: string;
  hiddenOptions?: HiddenOptions;
};

export type SectionsConfiguration = {
  formatValues?: {
    isNotAvailable: string;
    isDisabled: string;
  };
  headingSettings?: {
    isDisabled: string;
  };
  componentSettings?: ComponentSettings;
};

export type SerializedSettings = {
  chart: ChartCustomizationSettings;
  widget: WidgetCustomizationSettings;
};

export type WidgetTransform<S> = {
  serializeIn: (settings: S) => ChartCustomizationSettings;
  serializeOut: (settings: ChartCustomizationSettings) => Partial<S>;
};

export type NumericFormatter = {
  variableType?: string | 'datetime' | 'number';
  prefix?: string;
  suffix?: string;
  precision?: string;
  operation?: 'add' | 'subtract' | 'multiply' | 'divide';
  value?: string;
  separator?: boolean;
};

export type DateTimeFormatter = {
  variableType?: string | 'datetime' | 'number';
  prefix?: string;
  suffix?: string;
  dateFormat?: string;
  timeFormat?: string;
};

export type StringFormatter = {
  variableType?: string | 'datetime' | 'number';
  prefix?: string;
  suffix?: string;
};

export type FormatterSettings =
  | NumericFormatter
  | DateTimeFormatter
  | StringFormatter;

export type CircularChartValueMode = 'percentage' | 'numeric';
