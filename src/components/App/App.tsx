import React, { FC } from 'react';
import { PickerWidgets } from '@keen.io/widget-picker';

import { Layout, Section } from './App.styles';

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
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
};

const App: FC<Props> = ({
  chart,
  widget,
  onUpdateChartSettings,
  onUpdateWidgetSettings,
}) => {
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
    </Layout>
  );
};

export default App;
