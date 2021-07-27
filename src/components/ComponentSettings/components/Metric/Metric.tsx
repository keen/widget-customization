import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SettingsItem from '../../../SettingsItem';
import SectionTitle from '../../../SectionTitle';

import { SettingsModifier } from '../types';

const MetricSettings: FC<SettingsModifier> = ({
  widgetSettings,
  onUpdateWidgetSettings,
  hiddenOptions,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <SectionTitle title={t('widget_customization_metric_settings.title')} />
      {!hiddenOptions?.card && (
        <SettingsItem
          id="metric-card"
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
    </div>
  );
};

export default MetricSettings;
