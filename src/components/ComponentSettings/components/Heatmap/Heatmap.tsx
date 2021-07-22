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
  const { layout } = chartSettings;

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
      <LegendSettings
        label={t('widget_customization_slider_settings.label')}
        positionLabel={t('widget_customization_slider_settings.positionLabel')}
        isEnabled={legend.enabled}
        position={legend.position}
        onChange={(legendSettings) => {
          onUpdateWidgetSettings({
            ...widgetSettings,
            legend: { ...widgetSettings.legend, ...legendSettings },
          });
        }}
      />
      <SettingsItem
        label={t('widget_customization_reverse_axes_settings.label')}
        isEnabled={layout && layout === 'horizontal'}
        onChange={(option) => {
          onUpdateChartSettings({
            ...chartSettings,
            layout: option ? 'horizontal' : 'vertical',
          });
        }}
      />
    </div>
  );
};

export default HeatmapSettings;
