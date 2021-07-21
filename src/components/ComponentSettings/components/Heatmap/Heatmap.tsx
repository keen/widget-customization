import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import LegendSettings from '../../../LegendSettings';
import SectionTitle from '../../../SectionTitle';
import SettingsItem from '../../../SettingsItem';
import { SettingsModifier } from '../types';

const HeatmapSettings: FC<SettingsModifier> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  hiddenOptions,
}) => {
  const { t } = useTranslation();
  const { legend } = widgetSettings;

  return (
    <div>
      <SectionTitle title={t('widget_customization_heatmap_settings.title')} />
      {!hiddenOptions?.card && (
        <SettingsItem
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
      <SettingsItem
        label={t('widget_customization_reverse_axes_settings.label')}
        isEnabled={chartSettings.layout === 'horizontal'}
        onChange={(option) => {
          onUpdateChartSettings({
            ...chartSettings,
            layout: option ? 'horizontal' : 'vertical',
          });
        }}
      />
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
    </div>
  );
};

export default HeatmapSettings;
