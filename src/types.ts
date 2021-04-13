import { TextSettings } from '@keen.io/widgets';

export type ChartCustomizationSettings = {
  formatValue: string | null;
};

export type WidgetCustomizationSettings = {
  title: TextSettings;
  subtitle: TextSettings;
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
};
