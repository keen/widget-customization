import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CardSettings from '../../../CardSettings';
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
      <SectionTitle title={t('widget_customization_table_settings.title')} />
      {!hiddenOptions?.card && (
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
    </div>
  );
};

export default MetricSettings;
