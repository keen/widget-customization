import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyText } from '@keen.io/typography';
import { Input, Label, MousePositionedTooltip } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { InputContainer } from './AxesTitles.styles';

import FieldGroup from '../FieldGroup';
import SettingsContainer from '../SettingsContainer';

import { AppContext } from '../../contexts';

type Props = {
  /** X Axis title */
  xAxisTitle?: string;
  /* Y Axis title */
  yAxisTitle?: string;
  /** Settings disabled for customization */
  settingsDisabled?: string;
  /** Axes titles update event handler */
  onUpdateAxesTitles: (titles: {
    xAxisTitle: string;
    yAxisTitle: string;
  }) => void;
};

const AxesTitles: FC<Props> = ({
  xAxisTitle,
  yAxisTitle,
  settingsDisabled,
  onUpdateAxesTitles,
}) => {
  const { t } = useTranslation();
  const { modalContainer } = useContext(AppContext);

  return (
    <MousePositionedTooltip
      isActive={!!settingsDisabled}
      tooltipPortal={modalContainer}
      tooltipTheme="dark"
      renderContent={() => (
        <BodyText variant="body2" color={colors.white[500]}>
          {settingsDisabled}
        </BodyText>
      )}
    >
      <SettingsContainer isDisabled={!!settingsDisabled}>
        <FieldGroup data-testid="x-axis-title">
          <Label variant="secondary">
            {t('widget_customization_axis_settings.x_axis_title')}
          </Label>
          <InputContainer>
            <Input
              defaultValue={xAxisTitle}
              placeholder={t(
                'widget_customization_axis_settings.x_axis_title_placeholder'
              )}
              variant="solid"
              onChange={(e) =>
                onUpdateAxesTitles({
                  xAxisTitle: e.currentTarget.value,
                  yAxisTitle,
                })
              }
            />
          </InputContainer>
        </FieldGroup>
        <FieldGroup data-testid="y-axis-title">
          <Label variant="secondary">
            {t('widget_customization_axis_settings.y_axis_title')}
          </Label>
          <InputContainer>
            <Input
              defaultValue={yAxisTitle}
              placeholder={t(
                'widget_customization_axis_settings.y_axis_title_placeholder'
              )}
              variant="solid"
              onChange={(e) =>
                onUpdateAxesTitles({
                  xAxisTitle,
                  yAxisTitle: e.currentTarget.value,
                })
              }
            />
          </InputContainer>
        </FieldGroup>
      </SettingsContainer>
    </MousePositionedTooltip>
  );
};

export default AxesTitles;
