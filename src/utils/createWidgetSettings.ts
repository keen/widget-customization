import deepMerge from 'deepmerge';

import createHeadingSettings from './createHeadingSettings';

import { WidgetCustomizationSettings } from '../types';

/**
 * Creates widget settings for chart editor.
 *
 * @param widgetSettings - initial widget settings
 * @return widget settings
 *
 */
const createWidgetSettings = (
  widgetSettings: Record<string, any> = {}
): WidgetCustomizationSettings => {
  const { title, subtitle } = widgetSettings;
  const baseSettings = {
    ...createHeadingSettings(),
  };

  return deepMerge(
    baseSettings,
    { title, subtitle },
    {
      arrayMerge: (_target, source) => source,
    }
  ) as WidgetCustomizationSettings;
};

export default createWidgetSettings;
