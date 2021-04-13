import React, { FC } from 'react';

import { Layout, Section } from './App.styles';

import HeadingSettings from '../HeadingSettings';
import FormatSettings from '../FormatSettings';

import {
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
  SectionsConfiguration,
} from '../../types';

type Props = {
  /** Chart customization settings */
  chart: ChartCustomizationSettings;
  /** Widget customization settings */
  widget: WidgetCustomizationSettings;
  /** Update chart settings event handler */
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  /** Update widget settings event handler */
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
  /** Customization sections configuration */
  customizationSections: SectionsConfiguration;
  /** Connected saved query name */
  savedQueryName?: string;
};

const App: FC<Props> = ({
  chart,
  widget,
  savedQueryName,
  onUpdateChartSettings,
  onUpdateWidgetSettings,
  customizationSections,
}) => {
  const { headingSettings, formatValues } = customizationSections;

  const { title, subtitle } = widget;
  const { formatValue } = chart;

  return (
    <Layout>
      <Section>
        <HeadingSettings
          title={title}
          subtitle={subtitle}
          savedQueryName={savedQueryName}
          settingsDisabled={headingSettings?.isDisabled}
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
        <FormatSettings
          formattingDisabled={formatValues?.isDisabled}
          formattingNotAvailable={formatValues?.isNotAvailable}
          formatValue={formatValue}
          onUpdateFormatValue={(settings) =>
            onUpdateChartSettings({
              ...chart,
              formatValue: settings,
            })
          }
        />
      </Section>
    </Layout>
  );
};

export default App;
