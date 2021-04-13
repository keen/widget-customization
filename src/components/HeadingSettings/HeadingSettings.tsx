import React, { FC, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { Input, Label, MousePositionedTooltip } from '@keen.io/ui-core';
import { BodyText, FontWeight } from '@keen.io/typography';
import { TextSettings } from '@keen.io/widgets';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import {
  Container,
  InputContainer,
  FieldGroup,
  QueryIcon,
  UseQueryName,
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
  /** Connected saved query name */
  savedQueryName?: string;
};

const HeadingSettings: FC<Props> = ({
  title,
  subtitle,
  onUpdateTitleSettings,
  onUpdateSubtitleSettings,
  settingsDisabled,
  savedQueryName,
}) => {
  const { t } = useTranslation();
  const { modalContainer } = useContext(AppContext);

  const titleInput = useRef(null);

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
          {savedQueryName && (
            <MousePositionedTooltip
              isActive={!!savedQueryName}
              tooltipPortal={modalContainer}
              tooltipTheme="light"
              renderContent={() => (
                <BodyText variant="body2" color={colors.black[100]}>
                  {t(
                    'widget_customization_heading_settings.saved_query_name_tooltip'
                  )}
                </BodyText>
              )}
            >
              <UseQueryName
                data-testid="inherit-query-name"
                onClick={() => {
                  onUpdateTitleSettings({
                    ...title,
                    content: savedQueryName,
                  });

                  if (titleInput.current) {
                    titleInput.current.value = savedQueryName;
                  }
                }}
              >
                <BodyText variant="body3" fontWeight={400}>
                  <FontWeight fontWeight={700}>
                    {t(
                      'widget_customization_heading_settings.saved_query_name_label'
                    )}{' '}
                  </FontWeight>
                  {savedQueryName}
                </BodyText>
                <QueryIcon>
                  <Icon
                    type="share"
                    width={14}
                    height={14}
                    fill={transparentize(0.5, colors.black[100])}
                  />
                </QueryIcon>
              </UseQueryName>
            </MousePositionedTooltip>
          )}
          <FieldGroup>
            <Label variant="secondary">
              {t('widget_customization_heading_settings.title_label')}
            </Label>
            <InputContainer>
              <Input
                ref={titleInput}
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
