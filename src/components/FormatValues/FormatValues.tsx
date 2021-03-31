import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@keen.io/ui-core';

import { Container } from './FormatValues.styles';

import SectionTitle from '../SectionTitle';

type Props = {
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: string | null) => void;
};

const FormatValues: FC<Props> = ({ formatValue, onUpdateFormatValue }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  return (
    <Container>
      <SectionTitle
        title={t('widget_customization_format_value_settings.section_title')}
        description={t(
          'widget_customization_format_value_settings.section_description'
        )}
        onClear={() => {
          onUpdateFormatValue(null);
          inputRef.current.value = '';
        }}
      />
      <Input
        defaultValue={formatValue}
        ref={inputRef}
        variant="solid"
        onChange={(e) => {
          const value = e.currentTarget.value ? e.currentTarget.value : null;
          onUpdateFormatValue(value);
        }}
      />
    </Container>
  );
};

export default FormatValues;
