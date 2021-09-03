import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyText } from '@keen.io/typography';
import { Input } from '@keen.io/ui-core';

import { ControlContainer, Row, Container } from './PrefixAndSuffix.styles';

type Props = {
  onChange: ({ prefix, suffix }) => void;
  prefix: string;
  suffix: string;
};

const PrefixAndSuffix: FC<Props> = ({ onChange, prefix, suffix }) => {
  const { t } = useTranslation();

  const onPrefixChange = (e) => {
    const inputValue = e.currentTarget.value;
    onChange({
      suffix,
      prefix: inputValue,
    });
  };

  const onSuffixChange = (e) => {
    const inputValue = e.currentTarget.value;
    onChange({
      suffix: inputValue,
      prefix,
    });
  };

  return (
    <Container>
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_format_value_settings.prefix')}
        </BodyText>
        <ControlContainer>
          <Input
            data-testid="input-prefix"
            value={prefix || ''}
            variant="solid"
            placeholder={t(
              'widget_customization_format_value_settings.text_placeholder'
            )}
            onChange={(e) => onPrefixChange(e)}
          />
        </ControlContainer>
      </Row>
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_format_value_settings.suffix')}
        </BodyText>
        <ControlContainer>
          <Input
            data-testid="input-suffix"
            value={suffix || ''}
            variant="solid"
            placeholder={t(
              'widget_customization_format_value_settings.text_placeholder'
            )}
            onChange={(e) => onSuffixChange(e)}
          />
        </ControlContainer>
      </Row>
    </Container>
  );
};

export default PrefixAndSuffix;
