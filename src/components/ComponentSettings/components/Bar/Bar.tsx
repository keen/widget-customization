import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import LegendSettings from '../../../LegendSettings';
import GridSettings from '../../../GridSettings';
import CardSettings from '../../../CardSettings';
import SectionTitle from '../../../SectionTitle';

import { SettingsModifier } from '../types';

const BarSettings: FC<SettingsModifier> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  componentSettingsConfig,
}) => {
  const { t } = useTranslation();
  const { legend } = widgetSettings;

  return (
    <div>
      <SectionTitle title={t('widget_customization_bar_settings.title')} />
      {!componentSettingsConfig?.cardSettingsDisabled && (
        <CardSettings
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
      <GridSettings
        verticalGrid={chartSettings.verticalGrid}
        horizontalGrid={chartSettings.horizontalGrid}
        onChange={(settings) =>
          onUpdateChartSettings({ ...chartSettings, ...settings })
        }
      />
    </div>
  );
};

export default BarSettings;
