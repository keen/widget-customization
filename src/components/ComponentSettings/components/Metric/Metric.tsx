import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import SettingsItem from '../../../SettingsItem';
import SectionTitle from '../../../SectionTitle';

import { SettingsModifier } from '../types';
import { IconStyle, IconType } from './components';
import { slideMotion } from './motion';

const MetricSettings: FC<SettingsModifier> = ({
  widgetSettings,
  chartSettings,
  onUpdateChartSettings,
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
      <SettingsItem
        id="display-icon"
        label={t('widget_customization_metric_settings.display_icon')}
        isEnabled={chartSettings.iconEnabled}
        onChange={(iconEnabled) => {
          onUpdateChartSettings({
            ...chartSettings,
            iconEnabled,
          });
        }}
      />
      <AnimatePresence initial={false}>
        {chartSettings.iconEnabled && (
          <motion.div {...slideMotion} style={{ overflow: 'hidden' }}>
            <IconStyle
              iconStyle={chartSettings.iconStyle}
              onChange={(iconStyle) => {
                onUpdateChartSettings({
                  ...chartSettings,
                  iconStyle,
                });
              }}
            />
            <IconType
              iconType={chartSettings.iconType}
              onChange={(iconType) => {
                onUpdateChartSettings({
                  ...chartSettings,
                  iconType,
                });
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MetricSettings;
