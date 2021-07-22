import { LegendSettings, TextSettings } from '@keen.io/widgets';
import { CardSettings, Layout } from '@keen.io/ui-core';

export type ChartCustomizationSettings = {
  formatValue: string | null;
  verticalGrid?: boolean;
  horizontalGrid?: boolean;
  layout?: Layout;
  funnelPercentages?: boolean;
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
  prefix?: string;
  suffix?: string;
  precision?: string;
  operation?: 'add' | 'subtract' | 'multiply' | 'divide';
  value?: string;
  separator?: boolean;
};
