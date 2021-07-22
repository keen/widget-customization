import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@keen.io/ui-core';

import CardSettings from '../../../CardSettings';
import SectionTitle from '../../../SectionTitle';

import Label from '../../../Label';
import Row from '../../../Row';

import { SettingsModifier } from '../types';

const FunnelSettings: FC<SettingsModifier> = ({
  chartSettings,
  widgetSettings,
  onUpdateWidgetSettings,
  onUpdateChartSettings,
  hiddenOptions,
}) => {
  const { t } = useTranslation();
  const { funnelPercentages } = chartSettings;

  return (
    <div>
      <SectionTitle title={t('widget_customization_funnel_settings.title')} />
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
      <Row data-testid="funnel-percentages">
        <Label>{t('widget_customization_funnel_settings.percentages')}</Label>
        <Toggle
          isOn={funnelPercentages}
          onChange={(percentagesEnabled) =>
            onUpdateChartSettings({
              ...chartSettings,
              funnelPercentages: percentagesEnabled,
            })
          }
        />
      </Row>
    </div>
  );
};

export default FunnelSettings;
