import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Input, Label } from '@keen.io/ui-core';
import { TextSettings } from '@keen.io/widgets';

import {
  Container,
  InputContainer,
  FieldGroup,
} from './HeadingSettings.styles';

import SectionTitle from '../SectionTitle';

type Props = {
  /** Widget title settings */
  title: TextSettings;
  /** Widget subtitle settings */
  subtitle: TextSettings;
  /** Title settings update event handler */
  onUpdateTitleSettings: (settings: TextSettings) => void;
  /** Subtitle settings update event handler */
  onUpdateSubtitleSettings: (settings: TextSettings) => void;
};

const HeadingSettings: FC<Props> = ({
  title,
  subtitle,
  onUpdateTitleSettings,
  onUpdateSubtitleSettings,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <SectionTitle
        title={t('widget_customization_heading_settings.section_title')}
        description={t(
          'widget_customization_heading_settings.section_description'
        )}
      />
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
    </Container>
  );
};

export default HeadingSettings;
