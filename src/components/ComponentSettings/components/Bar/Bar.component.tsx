import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@keen.io/ui-core';

import LegendSettings from '../../../LegendSettings';
import SectionTitle from '../../../SectionTitle';
import Label from '../../../Label';
import Row from '../../../Row';

import {
  ChartCustomizationSettings,
  ComponentSettingsConfig,
  WidgetCustomizationSettings,
} from '../../../../types';

type Props = {
  /** Chart customization settings */
  chartSettings: ChartCustomizationSettings;
  /** Widget customization settings */
  widgetSettings: WidgetCustomizationSettings;
  /** Update chart settings event handler */
  onUpdateChartSettings: (chart: ChartCustomizationSettings) => void;
  /** Update widget settings event handler */
  onUpdateWidgetSettings: (widget: WidgetCustomizationSettings) => void;
  /** Component settings configuration */
  componentSettingsConfig: ComponentSettingsConfig;
};

const BarSettings: FC<Props> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  componentSettingsConfig,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionTitle title={t('widget_customization_bar_settings.title')} />
      {!componentSettingsConfig?.cardSettingsDisabled && (
        <Row data-testid="card-settings">
          <Label>{t('widget_customization_bar_settings.card')}</Label>
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
      )}
      <LegendSettings
        label={t('widget_customization_legend_settings.label')}
        positionLabel={t('widget_customization_legend_settings.positionLabel')}
        isEnabled={widgetSettings.legend.enabled}
        position={widgetSettings.legend.position}
        alignment={widgetSettings.legend.alignment}
        onChange={(legendSettings) => {
          onUpdateWidgetSettings({
            ...widgetSettings,
            legend: { ...widgetSettings.legend, ...legendSettings },
          });
        }}
      />
      <Row>
        <Label>{t('widget_customization_bar_settings.vertical_grid')}</Label>
        <Toggle
          isOn={chartSettings.verticalGrid}
          onChange={(verticalGrid) => {
            onUpdateChartSettings({ ...chartSettings, verticalGrid });
          }}
        />
      </Row>
      <Row>
        <Label>{t('widget_customization_bar_settings.horizontal_grid')}</Label>
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
