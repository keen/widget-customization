import WidgetCustomization from './WidgetCustomization';
import { serializeInputSettings, serializeOutputSettings } from './serializers';
import { useCustomizationSections } from './hooks';
import { createWidgetSettings } from './utils';

import {
  SerializedSettings,
  SectionsConfiguration,
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
} from './types';

export default WidgetCustomization;

export {
  useCustomizationSections,
  serializeInputSettings,
  serializeOutputSettings,
  createWidgetSettings,
  SerializedSettings,
  SectionsConfiguration,
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
};
