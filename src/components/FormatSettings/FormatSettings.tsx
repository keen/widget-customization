import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MousePositionedTooltip } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { Container } from './FormatSettings.styles';

import SectionTitle from '../SectionTitle';
import FormatValues from '../FormatValues';
import SettingsContainer from '../SettingsContainer';

import { AppContext } from '../../contexts';

type Props = {
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: string | null) => void;
  /** Settings disabled for customization */
  formattingDisabled?: string;
  /** Settings are not available */
  formattingNotAvailable?: string;
};

const FormatSettings: FC<Props> = ({
  formatValue,
  onUpdateFormatValue,
  formattingDisabled,
  formattingNotAvailable,
}) => {
  const { t } = useTranslation();
  const { modalContainer } = useContext(AppContext);

  const isDisabled = formattingDisabled || formattingNotAvailable;

  return (
    <Container>
      <SectionTitle
        title={t('widget_customization_format_value_settings.section_title')}
        description={t(
          'widget_customization_format_value_settings.section_description'
        )}
        onClear={isDisabled ? null : () => onUpdateFormatValue(null)}
      />
      {formattingNotAvailable ? (
        <BodyText variant="body1">{formattingNotAvailable}</BodyText>
      ) : (
        <MousePositionedTooltip
          isActive={!!formattingDisabled}
          tooltipPortal={modalContainer}
          tooltipTheme="dark"
          renderContent={() => (
            <BodyText variant="body2" color={colors.white[500]}>
              {formattingDisabled}
            </BodyText>
          )}
        >
          <SettingsContainer isDisabled={!!formattingDisabled}>
            <FormatValues
              formatValue={formatValue}
              onUpdateFormatValue={onUpdateFormatValue}
            />
          </SettingsContainer>
        </MousePositionedTooltip>
      )}
    </Container>
  );
};

export default FormatSettings;
