import { TextSettings } from '@keen.io/widgets';

export type ChartCustomizationSettings = {
  formatValue: string | null;
};

export type WidgetCustomizationSettings = {
  title: TextSettings;
  subtitle: TextSettings;
};

export type SectionsConfiguration = {
  formatValues?: {
    isNotAvailable: string;
    isDisabled: string;
  };
  headingSettings?: {
    isDisabled: string;
  };
};

export type SerializedSettings = {
  chart: ChartCustomizationSettings;
  widget: WidgetCustomizationSettings;
};

export type WidgetTransform<S> = {
  serializeIn: (settings: S) => ChartCustomizationSettings;
  serializeOut: (settings: ChartCustomizationSettings) => Partial<S>;
};
