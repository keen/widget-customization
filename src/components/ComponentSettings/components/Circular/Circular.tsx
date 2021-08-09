import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import LegendSettings from '../../../LegendSettings';
import SettingsItem from '../../../SettingsItem';
import SectionTitle from '../../../SectionTitle';
import ValueMode from '../../../ValueMode';

import { SettingsModifier } from '../types';

const CircularSettings: FC<SettingsModifier> = ({
  widgetSettings,
  chartSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  hiddenOptions,
}) => {
  const { t } = useTranslation();
  const { legend } = widgetSettings;

  return (
    <div>
      <SectionTitle title={t('widget_customization_circular_settings.title')} />
      {!hiddenOptions?.card && (
        <SettingsItem
          id="circular-card"
          label={t('widget_customization_card_settings.label')}
          isEnabled={widgetSettings.card.enabled}
          onChange={(cardEnabled) => {
            onUpdateWidgetSettings({
              ...widgetSettings,
              card: { ...widgetSettings.card, enabled: cardEnabled },
            });
          }}
        />
      )}
      <LegendSettings
        label={t('widget_customization_legend_settings.label')}
        positionLabel={t('widget_customization_legend_settings.positionLabel')}
        isEnabled={legend.enabled}
        position={legend.position}
        alignment={legend.alignment}
        onChange={(legendSettings) => {
          onUpdateWidgetSettings({
            ...widgetSettings,
            legend: { ...widgetSettings.legend, ...legendSettings },
          });
        }}
      />
      <ValueMode
        label={t('widget_customization_circular_settings.label')}
        valueMode={chartSettings.valueMode}
        onChange={(circularSettings) => {
          onUpdateChartSettings({
            ...chartSettings,
            valueMode: circularSettings.valueMode,
          });
        }}
      />
    </div>
  );
};

export default CircularSettings;
