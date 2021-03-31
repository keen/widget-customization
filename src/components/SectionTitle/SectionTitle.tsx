import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { Headline, BodyText } from '@keen.io/typography';
import { Button } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { Container, Header } from './SectionTitle.styles';

type Props = {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Clear section event handler */
  onClear?: () => void;
};

const SectionTitle: FC<Props> = ({ title, description, onClear }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Header>
        <Headline variant="h4">{title}</Headline>
        {onClear && (
          <Button
            size="small"
            style="outline"
            variant="secondary"
            onClick={onClear}
          >
            {t('widget_customization_section.clear_button')}
          </Button>
        )}
      </Header>
      {description && (
        <BodyText
          variant="body2"
          color={transparentize(0.5, colors.black[100])}
        >
          {description}
        </BodyText>
      )}
    </Container>
  );
};

export default SectionTitle;
