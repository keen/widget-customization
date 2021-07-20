import { LegendSettings, TextSettings } from '@keen.io/widgets';
import { CardSettings } from '@keen.io/ui-core';

export type ChartCustomizationSettings = {
  formatValue: string | null;
  verticalGrid?: boolean;
  horizontalGrid?: boolean;
};

export type WidgetCustomizationSettings = {
  title: TextSettings;
  subtitle: TextSettings;
  legend: Partial<LegendSettings>;
  card: Partial<CardSettings>;
};

export type SectionsConfiguration = {
  formatValues?: {
    isNotAvailable: string;
    isDisabled: string;
  };
  headingSettings?: {
    isDisabled: string;
  };
  componentSettings?: ComponentSettingsConfig;
};

export type ComponentSettingsConfig = {
  cardSettingsDisabled: boolean;
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
