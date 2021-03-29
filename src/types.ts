export type CustomizationSettings = {
  formatValue: string | null;
};

export type WidgetTransform<S> = {
  serializeIn: (settings: S) => CustomizationSettings;
  serializeOut: (settings: CustomizationSettings) => Partial<S>;
};
