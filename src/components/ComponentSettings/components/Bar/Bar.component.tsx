import React, { FC } from 'react';
import SectionTitle from '../../../SectionTitle';
import { Toggle } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { Row } from './Bar.styles';
import {
  ChartCustomizationSettings,
  WidgetCustomizationSettings,
} from '../../../../types';
import { useTranslation } from 'react-i18next';

type Props = {
  /** Chart customization settings */
  chartSettings: ChartCustomizationSettings;
  /** Widget customization settings */
  widgetSettings: WidgetCustomizationSettings;
  /** Update chart settings event handler */
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  /** Update widget settings event handler */
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
};

const BarSettings: FC<Props> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionTitle title={t('widget_customization_bar_settings.title')} />
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_bar_settings.card')}
        </BodyText>
        <Toggle
          isOn={widgetSettings.card.enabled}
          onChange={(cardEnabled) => {
            onUpdateWidgetSettings({
              ...widgetSettings,
              card: { ...widgetSettings.card, enabled: cardEnabled },
            });
          }}
        />
      </Row>
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_bar_settings.legend')}
        </BodyText>
        <Toggle
          isOn={widgetSettings.legend.enabled}
          onChange={(legendEnabled) => {
            onUpdateWidgetSettings({
              ...widgetSettings,
              legend: { ...widgetSettings.legend, enabled: legendEnabled },
            });
          }}
        />
      </Row>
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_bar_settings.vertical_grid')}
        </BodyText>
        <Toggle
          isOn={chartSettings.verticalGrid}
          onChange={(verticalGrid) => {
            onUpdateChartSettings({ ...chartSettings, verticalGrid });
          }}
        />
      </Row>
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_bar_settings.horizontal_grid')}
        </BodyText>
        <Toggle
          isOn={chartSettings.horizontalGrid}
          onChange={(horizontalGrid) => {
            onUpdateChartSettings({ ...chartSettings, horizontalGrid });
          }}
        />
      </Row>
    </div>
  );
};

export default BarSettings;
