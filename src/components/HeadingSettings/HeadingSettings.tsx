import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Label, MousePositionedTooltip } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { TextSettings } from '@keen.io/widgets';
import { colors } from '@keen.io/colors';

import {
  Container,
  InputContainer,
  FieldGroup,
} from './HeadingSettings.styles';

import SectionTitle from '../SectionTitle';
import SettingsContainer from '../SettingsContainer';

import { AppContext } from '../../contexts';

type Props = {
  /** Widget title settings */
  title: TextSettings;
  /** Widget subtitle settings */
  subtitle: TextSettings;
  /** Title settings update event handler */
  onUpdateTitleSettings: (settings: TextSettings) => void;
  /** Subtitle settings update event handler */
  onUpdateSubtitleSettings: (settings: TextSettings) => void;
  /** Settings disabled for customization */
  settingsDisabled?: string;
};

const HeadingSettings: FC<Props> = ({
  title,
  subtitle,
  onUpdateTitleSettings,
  onUpdateSubtitleSettings,
  settingsDisabled,
}) => {
  const { t } = useTranslation();
  const { modalContainer } = useContext(AppContext);

  return (
    <Container>
      <SectionTitle
        title={t('widget_customization_heading_settings.section_title')}
        description={t(
          'widget_customization_heading_settings.section_description'
        )}
      />
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
          <FieldGroup>
            <Label variant="secondary">
              {t('widget_customization_heading_settings.title_label')}
            </Label>
            <InputContainer>
              <Input
                defaultValue={title.content}
                placeholder={t(
                  'widget_customization_heading_settings.title_placeholder'
                )}
                variant="solid"
                onChange={(e) =>
                  onUpdateTitleSettings({
                    ...title,
                    content: e.currentTarget.value,
                  })
                }
              />
            </InputContainer>
          </FieldGroup>
          <FieldGroup>
            <Label variant="secondary">
              {t('widget_customization_heading_settings.subtitle_label')}
            </Label>
            <InputContainer>
              <Input
                defaultValue={subtitle.content}
                placeholder={t(
                  'widget_customization_heading_settings.subtitle_placeholder'
                )}
                variant="solid"
                onChange={(e) =>
                  onUpdateSubtitleSettings({
                    ...subtitle,
                    content: e.currentTarget.value,
                  })
                }
              />
            </InputContainer>
          </FieldGroup>
        </SettingsContainer>
      </MousePositionedTooltip>
    </Container>
  );
};

export default HeadingSettings;
