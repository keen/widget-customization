import React, { FC, useContext, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';

import { BodyText } from '@keen.io/typography';
import {
  DropableContainer,
  Dropdown,
  DropdownList,
  DropdownListContainer,
  MousePositionedTooltip,
} from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { DateTimeFormatter, FormatterSettings } from '../../../../../types';
import { createFormatterSettings } from '../../../../../utils';
import { serializeFormatterSettings } from '../../../../../serializers';
import { AppContext } from '../../../../../contexts';

import { PrefixAndSuffix } from '../components';

import {
  InputWrapper,
  Row,
  ControlContainer,
  DropdownWrapper,
} from './DateTimeFormatter.styles';
import { DATE_FORMATS, TIME_FORMATS } from './constants';

type Props = {
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: string | null) => void;
};

const initialState: FormatterSettings = {
  prefix: '',
  suffix: '',
  dateFormat: '',
  timeFormat: '',
};

const DateTimeFormatter: FC<Props> = ({ formatValue, onUpdateFormatValue }) => {
  const { t } = useTranslation();
  const { modalContainer } = useContext(AppContext);

  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [state, setState] = useState<DateTimeFormatter>(initialState);

  const TranslatedDateFormats = DATE_FORMATS.map(({ label, value }) => ({
    label: t(label),
    value,
  }));
  const TranslatedTimeFormats = TIME_FORMATS.map(({ label, value }) => ({
    label: t(label),
    value,
  }));

  useEffect(() => {
    if (formatValue) {
      const settings = createFormatterSettings(formatValue, 'datetime');
      setState(settings);
    }
  }, []);

  useEffect(() => {
    const settings = createFormatterSettings(formatValue, 'datetime');
    setState((state) => ({ ...state, ...settings }));
  }, [formatValue]);

  const { prefix, suffix, dateFormat, timeFormat, variableType } = state;

  useDebounce(
    () => {
      const newFormatValue = serializeFormatterSettings({
        variableType,
        prefix,
        suffix,
        dateFormat,
        timeFormat,
      });

      if (newFormatValue !== formatValue) {
        onUpdateFormatValue(newFormatValue);
      }
    },
    300,
    [state, formatValue]
  );

  const selectedDateFormat =
    TranslatedDateFormats.find((format) => format.value === state.dateFormat) ||
    TranslatedDateFormats[0];
  const selectedTimeFormat =
    TranslatedTimeFormats.find((format) => format.value === state.timeFormat) ||
    null;

  const onTimeFormatChange = (format) => {
    setState({
      ...state,
      timeFormat: format.value,
    });
    setTimeDropdownOpen(!timeDropdownOpen);
  };

  const onDateFormatChange = (format) => {
    let timeFormat = state.timeFormat;
    setDateDropdownOpen(!dateDropdownOpen);

    if (format.value !== 'original') {
      setTimeDropdownOpen(true);
      timeFormat = timeFormat || TranslatedTimeFormats[0].value;
    } else {
      timeFormat = null;
    }

    setState({
      ...state,
      timeFormat,
      dateFormat: format.value,
    });
  };

  return (
    <div>
      <PrefixAndSuffix
        onChange={(values) =>
          setState({
            ...state,
            ...values,
          })
        }
        prefix={state.prefix}
        suffix={state.suffix}
      />
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_format_value_settings.date_format')}
        </BodyText>
        <ControlContainer>
          <InputWrapper data-testid="date-select">
            <DropableContainer
              variant="secondary"
              onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
              isActive={dateDropdownOpen}
              value={selectedDateFormat.label}
              dropIndicator
              onDefocus={() => setDateDropdownOpen(false)}
            >
              {selectedDateFormat.label}
            </DropableContainer>
            <Dropdown isOpen={dateDropdownOpen}>
              <DropdownListContainer scrollToActive maxHeight={150}>
                {(activeItemRef) => (
                  <DropdownList
                    ref={activeItemRef}
                    items={TranslatedDateFormats}
                    setActiveItem={(item) =>
                      selectedDateFormat.value === item.value
                    }
                    onClick={(e, format) => onDateFormatChange(format)}
                  />
                )}
              </DropdownListContainer>
            </Dropdown>
          </InputWrapper>
          <InputWrapper data-testid="time-select">
            <MousePositionedTooltip
              isActive={selectedDateFormat.value === 'original'}
              tooltipPortal={modalContainer}
              tooltipTheme="dark"
              renderContent={() => (
                <BodyText variant="body2" color={colors.white[500]}>
                  {t(
                    'widget_customization_format_value_settings.select_the_date_format_first'
                  )}
                </BodyText>
              )}
            >
              <DropdownWrapper
                isDisabled={selectedDateFormat.value === 'original'}
              >
                <DropableContainer
                  variant="secondary"
                  onClick={() => setTimeDropdownOpen(!timeDropdownOpen)}
                  isActive={timeDropdownOpen}
                  value={
                    selectedTimeFormat
                      ? selectedTimeFormat.label
                      : t(
                          'widget_customization_format_value_settings.time_format'
                        )
                  }
                  dropIndicator
                  onDefocus={() => setTimeDropdownOpen(false)}
                >
                  {selectedTimeFormat
                    ? selectedTimeFormat.label
                    : t(
                        'widget_customization_format_value_settings.time_format'
                      )}
                </DropableContainer>
                <Dropdown isOpen={timeDropdownOpen}>
                  <DropdownListContainer scrollToActive maxHeight={150}>
                    {(activeItemRef) => (
                      <DropdownList
                        ref={activeItemRef}
                        items={TranslatedTimeFormats}
                        setActiveItem={(item) =>
                          selectedTimeFormat &&
                          selectedTimeFormat.value === item.value
                        }
                        onClick={(e, format) => onTimeFormatChange(format)}
                      />
                    )}
                  </DropdownListContainer>
                </Dropdown>
              </DropdownWrapper>
            </MousePositionedTooltip>
          </InputWrapper>
        </ControlContainer>
      </Row>
    </div>
  );
};

export default DateTimeFormatter;
