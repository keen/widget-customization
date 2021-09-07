import React, { FC, useContext } from 'react';
import { PickerWidgets } from '@keen.io/widget-picker';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { MousePositionedTooltip } from '@keen.io/ui-core';

import { AppContext } from '../../contexts';

import SettingsContainer from '../SettingsContainer';

import { FormatNumericSettings, FormatTableSettings } from './components';
import { ChartCustomizationSettings } from '../../types';

type Props = {
  /** Widget type */
  widgetType: PickerWidgets;
  chartSettings: ChartCustomizationSettings;
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: ({
    formatValue,
    formatTableColumns,
  }: FormatSettings) => void;
  onUpdateColumnNamesMapping: ({ columnsNamesMapping }) => void;
  /** Settings disabled for customization */
  formattingDisabled?: string;
  /** Settings are not available */
  formattingNotAvailable?: string;
};

type FormatSettings = {
  formatValue?: string | null;
  formatTableColumns?: Record<string, any>;
};

const FormatSettings: FC<Props> = ({
  widgetType,
  chartSettings,
  onUpdateFormatValue,
  formattingDisabled,
  formattingNotAvailable,
  onUpdateColumnNamesMapping,
}) => {
  const { modalContainer } = useContext(AppContext);

  return (
    <>
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
                columnsNamesMapping={chartSettings.columnsNamesMapping}
                onUpdateColumnName={(name, newName) => {
                  const columnsMap = {
                    ...chartSettings.columnsNamesMapping,
                  };
                  if (newName === '') delete columnsMap[name];
                  else columnsMap[name] = newName;
                  onUpdateColumnNamesMapping({
                    columnsNamesMapping: columnsMap,
                  });
                }}
                onUpdateFormatValue={(settings) =>
                  onUpdateFormatValue({
                    formatTableColumns: {
                      ...chartSettings.formatTableColumns,
                      ...settings,
                    },
                  })
                }
              />
            ) : (
              <FormatNumericSettings
                formatValue={chartSettings.formatValue}
                isDisabled={!!formattingDisabled || !!formattingNotAvailable}
                onUpdateFormatValue={(settings) =>
                  onUpdateFormatValue({ formatValue: settings })
                }
              />
            )}
          </SettingsContainer>
        </MousePositionedTooltip>
      )}
    </>
  );
};

export default FormatSettings;
