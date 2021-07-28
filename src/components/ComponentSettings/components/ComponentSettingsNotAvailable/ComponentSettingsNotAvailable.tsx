import { transparentize } from 'polished';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';
import { PickerWidgets } from '@keen.io/widget-picker';

type Props = {
  widgetType?: PickerWidgets;
};

const ComponentSettingsNotAvailable = ({ widgetType }: Props) => {
  const { t } = useTranslation();

  return (
    <BodyText
      variant="body1"
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      color={transparentize(0.5, colors.black[100])}
    >
      {widgetType
        ? t('widget_customization.chart_settings_not_available_for_widget', {
            widget: widgetType,
          })
        : t('widget_customization.chart_settings_not_available')}
    </BodyText>
  );
};

export default ComponentSettingsNotAvailable;
