import React, { FC, useContext } from 'react';
import { PickerWidgets } from '@keen.io/widget-picker';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { MousePositionedTooltip } from '@keen.io/ui-core';

import { AppContext } from '../../contexts';

import SettingsContainer from '../SettingsContainer';

import { FormatNumericSettings, FormatTableSettings } from './components';

type Props = {
  /** Widget type */
  widgetType: PickerWidgets;
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: ({
    formatValue,
    formatTableSettings,
  }: FormatSettings) => void;
  /** Settings disabled for customization */
  formattingDisabled?: string;
  /** Settings are not available */
  formattingNotAvailable?: string;
};

type FormatSettings = {
  formatValue?: string | null;
  formatTableSettings?: Record<string, any>;
};

const FormatSettings: FC<Props> = ({
  widgetType,
  formatValue,
  onUpdateFormatValue,
  formattingDisabled,
  formattingNotAvailable,
}) => {
  const { modalContainer } = useContext(AppContext);

  // komponent powinien ogarniać jaki to jest typ i zwracać odpowiednie formatValues albo formatTableColumns

  return (
    <div>
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
            {widgetType === 'table' ? (
              <FormatTableSettings
                formatValue={formatValue}
                onUpdateFormatValue={(settings) =>
                  onUpdateFormatValue({ formatTableSettings: settings })
                }
              />
            ) : (
              <FormatNumericSettings
                formatValue={formatValue}
                onUpdateFormatValue={(settings) =>
                  onUpdateFormatValue({ formatValue: settings })
                }
              />
            )}
          </SettingsContainer>
        </MousePositionedTooltip>
      )}
    </div>
  );
};

export default FormatSettings;
