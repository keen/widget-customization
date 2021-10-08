import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';

import { BodyText } from '@keen.io/typography';
import {
  DropableContainer,
  Dropdown,
  DropdownList,
  DropdownListContainer,
  MousePositionedTooltip,
  KEYBOARD_KEYS,
} from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { useKeypress } from '@keen.io/react-hooks';

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
  const [formatterElements, setFormatterElements] = useState<DateTimeFormatter>(
    initialState
  );
  const [format, setFormat] = useState(formatValue);
  const [selectionIndex, setIndex] = useState<number>(null);
  const TranslatedDateFormats = DATE_FORMATS.map(({ label, value }) => ({
    label: t(label),
    value,
  }));
  const TranslatedTimeFormats = TIME_FORMATS.map(({ label, value }) => ({
    label: t(label),
    value,
  }));

  useEffect(() => {
    const settings = createFormatterSettings(formatValue, 'datetime');
    setFormatterElements((state) => ({ ...state, ...settings }));
  }, [formatValue]);

  useEffect(() => {
    const { dateFormat, timeFormat } = formatterElements;
    let index = 0;

    if (dateDropdownOpen) {
      const precisionIndex = TranslatedDateFormats.findIndex(
        ({ value }) => value === dateFormat
      );
      if (precisionIndex > 0) index = precisionIndex;
    }

    if (timeDropdownOpen) {
      const operationIndex = TranslatedTimeFormats.findIndex(
        ({ value }) => value === timeFormat
      );
      if (operationIndex > 0) index = operationIndex;
    }

    setIndex(index);

    return () => {
      setIndex(null);
    };
  }, [dateDropdownOpen, timeDropdownOpen]);

  useDebounce(() => onUpdateFormatValue(format), 300, [format]);

  const selectedDateFormat =
    TranslatedDateFormats.find(
      (format) => format.value === formatterElements.dateFormat
    ) || TranslatedDateFormats[0];
  const selectedTimeFormat =
    TranslatedTimeFormats.find(
      (format) => format.value === formatterElements.timeFormat
    ) || null;

  const updateFormat = (values) => {
    const newFormatterElements = {
      ...formatterElements,
      ...values,
    };
    setFormatterElements(newFormatterElements);
    const newFormatValue = serializeFormatterSettings(newFormatterElements);
    setFormat(newFormatValue);
  };

  const onTimeFormatChange = (format) => {
    updateFormat({
      timeFormat: format.value,
    });
    setTimeDropdownOpen(!timeDropdownOpen);
  };

  const onDateFormatChange = (format, enableAdditionalAction = true) => {
    let timeFormat = formatterElements.timeFormat;
    setDateDropdownOpen(!dateDropdownOpen);

    if (format.value !== 'original') {
      if (enableAdditionalAction) setTimeDropdownOpen(true);
      timeFormat = timeFormat || TranslatedTimeFormats[0].value;
    } else {
      timeFormat = null;
    }

    updateFormat({
      timeFormat,
      dateFormat: format.value,
    });
  };

  const keyboardHandler = useCallback(
    (_e: KeyboardEvent, keyCode: number) => {
      switch (keyCode) {
        case KEYBOARD_KEYS.ENTER:
          if (dateDropdownOpen) {
            const format = TranslatedDateFormats[selectionIndex];
            onDateFormatChange(format, false);
          }

          if (timeDropdownOpen) {
            const format = TranslatedTimeFormats[selectionIndex];
            onTimeFormatChange(format);
          }
          break;
        case KEYBOARD_KEYS.UP:
          if (selectionIndex > 0) {
            setIndex(selectionIndex - 1);
          }
          break;
        case KEYBOARD_KEYS.DOWN:
          if (selectionIndex === null) {
            setIndex(0);
          } else if (
            (dateDropdownOpen &&
              selectionIndex < TranslatedDateFormats.length - 1) ||
            (timeDropdownOpen &&
              selectionIndex < TranslatedTimeFormats.length - 1)
          ) {
            setIndex(selectionIndex + 1);
          }
          break;
        case KEYBOARD_KEYS.ESCAPE:
          if (dateDropdownOpen) setDateDropdownOpen(false);
          if (timeDropdownOpen) setTimeDropdownOpen(false);
          break;
      }
    },
    [selectionIndex, dateDropdownOpen, timeDropdownOpen]
  );

  useKeypress({
    keyboardAction: keyboardHandler,
    handledKeys: [
      KEYBOARD_KEYS.ENTER,
      KEYBOARD_KEYS.ESCAPE,
      KEYBOARD_KEYS.UP,
      KEYBOARD_KEYS.DOWN,
    ],
    addEventListenerCondition: dateDropdownOpen || timeDropdownOpen,
    eventListenerDependencies: [
      dateDropdownOpen,
      timeDropdownOpen,
      selectionIndex,
      TranslatedDateFormats,
      TranslatedTimeFormats,
    ],
  });

  return (
    <div>
      <PrefixAndSuffix
        onChange={(values) => updateFormat({ ...values })}
        prefix={formatterElements.prefix}
        suffix={formatterElements.suffix}
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
                    setActiveItem={({ value }) =>
                      TranslatedDateFormats[selectionIndex] &&
                      TranslatedDateFormats[selectionIndex].value === value
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
                        setActiveItem={({ value }) =>
                          TranslatedTimeFormats[selectionIndex] &&
                          TranslatedTimeFormats[selectionIndex].value === value
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
