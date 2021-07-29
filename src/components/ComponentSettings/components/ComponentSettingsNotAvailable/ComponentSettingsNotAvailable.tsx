import { transparentize } from 'polished';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';
import { PickerWidgets } from '@keen.io/widget-picker';

import { NoComponentSettingsWrapper } from './ComponentSettingsNotAvailable.styles';

type Props = {
  widgetType?: PickerWidgets;
};

const ComponentSettingsNotAvailable = ({ widgetType }: Props) => {
  const { t } = useTranslation();

  return (
    <NoComponentSettingsWrapper>
      <BodyText variant="body1" color={transparentize(0.5, colors.black[100])}>
        {widgetType
          ? t('widget_customization.chart_settings_not_available_for_widget', {
              widget: widgetType,
            })
          : t('widget_customization.chart_settings_not_available')}
      </BodyText>
    </NoComponentSettingsWrapper>
  );
};

export default ComponentSettingsNotAvailable;
