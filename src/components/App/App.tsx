import React, { FC } from 'react';
import { Headline } from '@keen.io/typography';
import { PickerWidgets } from '@keen.io/widget-picker';
import { colors } from '@keen.io/colors';
import { useTranslation } from 'react-i18next';

import { Layout, Section, CustomizationDisabled } from './App.styles';

import HeadingSettings from '../HeadingSettings';
import FormatValues from '../FormatValues';

import {
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
} from '../../types';

type Props = {
  /** Widget type */
  widgetType: PickerWidgets;
  /** Chart customization settings */
  chart: ChartCustomizationSettings;
  /** Widget customization settings */
  widget: WidgetCustomizationSettings;
  /** Update chart settings event handler */
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  /** Update widget settings event handler */
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
  /** Customization disabled */
  isCustomizationDisabled: boolean;
};

const App: FC<Props> = ({
  chart,
  widget,
  onUpdateChartSettings,
  onUpdateWidgetSettings,
  isCustomizationDisabled,
}) => {
  const { t } = useTranslation();

  const { title, subtitle } = widget;
  const { formatValue } = chart;

  return (
    <Layout>
      <Section>
        <HeadingSettings
          title={title}
          subtitle={subtitle}
          onUpdateTitleSettings={(settings) =>
            onUpdateWidgetSettings({
              ...widget,
              title: settings,
            })
          }
          onUpdateSubtitleSettings={(settings) =>
            onUpdateWidgetSettings({
              ...widget,
              subtitle: settings,
            })
          }
        />
      </Section>
      <Section>
        <FormatValues
          formatValue={formatValue}
          onUpdateFormatValue={(settings) =>
            onUpdateChartSettings({
              ...chart,
              formatValue: settings,
            })
          }
        />
      </Section>
      {isCustomizationDisabled && (
        <CustomizationDisabled onClick={(e) => e.stopPropagation()}>
          <Headline variant="h3" color={colors.blue[500]} fontWeight={400}>
            {t('widget_customization.settings_disabled')}
          </Headline>
        </CustomizationDisabled>
      )}
    </Layout>
  );
};

export default App;
