import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@keen.io/ui-core';

import CardSettings from '../../../CardSettings';
import SectionTitle from '../../../SectionTitle';

import Label from '../../../Label';
import Row from '../../../Row';

import { SettingsModifier } from '../types';

const ChoroplethSettings: FC<SettingsModifier> = ({
  widgetSettings,
  onUpdateWidgetSettings,
  hiddenOptions,
}) => {
  const { t } = useTranslation();
  const { legend } = widgetSettings;

  return (
    <div>
      <SectionTitle
        title={t('widget_customization_choropleth_settings.title')}
      />
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
      <Row data-testid="choropleth-slider">
        <Label>{t('widget_customization_choropleth_settings.slider')}</Label>
        <Toggle
          isOn={legend.enabled}
          onChange={(legendEnabled) =>
            onUpdateWidgetSettings({
              ...widgetSettings,
              legend: { ...widgetSettings.legend, enabled: legendEnabled },
            })
          }
        />
      </Row>
    </div>
  );
};

export default ChoroplethSettings;
