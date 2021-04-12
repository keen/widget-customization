/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const { geographicArea, ...restSettings } = widgetSettings;
  const baseSettings = {
    ...createHeadingSettings(),
  };

  return deepMerge(baseSettings, restSettings, {
    arrayMerge: (_target, source) => source,
  }) as WidgetCustomizationSettings;
};

export default createWidgetSettings;
