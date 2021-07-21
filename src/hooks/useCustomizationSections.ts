import { useTranslation } from 'react-i18next';
import { Query } from '@keen.io/query';
import { PickerWidgets } from '@keen.io/widget-picker';

import { formatAnalysis } from '../utils';

import {
  HEADING_DISABLED_WIDGETS,
  FORMAT_VALUES_DISABLED_WIDGETS,
} from '../constants';

import { HiddenOptions, SectionsConfiguration } from '../types';

/**
 * Creates sections configuration based on query semantic and widget type
 *
 * @param isQueryBootstrapped - query run indicator
 * @param query - query settings
 * @param widgetType - widget type
 * @param hiddenOptions - allows to not show specified settings
 * @return widget customization sections configuration
 *
 */
const useCustomizationSections = (
  isQueryBootstrapped: boolean,
  query: Query,
  widgetType: PickerWidgets,
  hiddenOptions?: HiddenOptions
): SectionsConfiguration => {
  let sectionsConfig: SectionsConfiguration = {
    headingSettings: {
      isDisabled: null,
    },
    formatValues: {
      isNotAvailable: null,
      isDisabled: null,
    },
    componentSettings: {
      isDisabled: null,
      hiddenOptions,
    },
  };

  const { t } = useTranslation();

  if (!isQueryBootstrapped) {
    return {
      headingSettings: {
        isDisabled: t('widget_customization.settings_disabled'),
      },
      formatValues: {
        isNotAvailable: null,
        isDisabled: t('widget_customization.settings_disabled'),
      },
      componentSettings: {
        isDisabled: t('widget_customization.settings_disabled'),
        hiddenOptions,
      },
    };
  }

  const { analysis_type: analysisType } = query;
  const formatValuesNotAvailable =
    analysisType === 'extraction' || analysisType === 'select_unique';

  if (formatValuesNotAvailable) {
    sectionsConfig = {
      ...sectionsConfig,
      formatValues: {
        isDisabled: null,
        isNotAvailable: t('widget_customization.format_values_not_avaialble', {
          analysis: formatAnalysis(analysisType),
        }),
      },
    };
  }

  if (HEADING_DISABLED_WIDGETS.includes(widgetType)) {
    sectionsConfig = {
      ...sectionsConfig,
      headingSettings: {
        isDisabled: t('widget_customization.settings_disabled_for_widget', {
          widget: widgetType,
        }),
      },
    };
  }

  if (
    !formatValuesNotAvailable &&
    FORMAT_VALUES_DISABLED_WIDGETS.includes(widgetType)
  ) {
    sectionsConfig = {
      ...sectionsConfig,
      formatValues: {
        isDisabled: t('widget_customization.settings_disabled_for_widget', {
          widget: widgetType,
        }),
        isNotAvailable: null,
      },
    };
  }

  return sectionsConfig;
};

export default useCustomizationSections;
