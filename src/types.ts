import { LegendSettings, TextSettings } from '@keen.io/widgets';
import { CardSettings, Layout } from '@keen.io/ui-core';

export type ChartCustomizationSettings = {
  formatValue?: string | null;
  verticalGrid?: boolean;
  horizontalGrid?: boolean;
  layout?: Layout;
  xAxisTitle?: string;
  yAxisTitle?: string;
  funnelPercentages?: boolean;
  valueMode?: CircularChartValueMode;
  formatTableColumns?: Record<string, any>;
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

export type FormatterSettings = {
  variableType?: string | 'datetime' | 'number'; // todo
  prefix?: string;
  suffix?: string;
  precision?: string;
  operation?: 'add' | 'subtract' | 'multiply' | 'divide';
  value?: string;
  separator?: boolean;
  dateFormat?: string;
  timeFormat?: string;
};

export type CircularChartValueMode = 'percentage' | 'numeric';
