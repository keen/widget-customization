/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'react-use';
import { transparentize } from 'polished';

import { colors } from '@keen.io/colors';
import {
  Input,
  DropableContainer,
  DropdownListContainer,
  Dropdown,
  DropdownList,
  Checkbox,
  KEYBOARD_KEYS,
  Alert,
} from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { useKeypress } from '@keen.io/react-hooks';

import {
  Container,
  Row,
  MultiControl,
  ControlContainer,
  StyledLabel,
  LabelText,
} from './NumericFormatter.styles';

import { DEFAULT_FORMATTER_PATTERN } from '../../../../../constants';
import { createFormatterSettings } from '../../../../../utils';
import { serializeFormatterSettings } from '../../../../../serializers';
import { FormatterSettings, NumericFormatter } from '../../../../../types';

import { PrefixAndSuffix } from '../components';

import {
  PATTERNS_OPTIONS as patterns,
  OPERATIONS_OPTIONS as operationsOptions,
} from './constants';

type Props = {
  /** Value formatter pattern */
  formatValue: string | null;
  /** Update formatter event handler */
  onUpdateFormatValue: (formatValue: string | null) => void;
};

const initialState: FormatterSettings = {
  prefix: '',
  suffix: '',
  precision: '',
  operation: null,
  value: '',
  separator: false,
};

const NumericFormatter: FC<Props> = ({ formatValue, onUpdateFormatValue }) => {
  const { t } = useTranslation();

  const [dropdown, setDropdown] = useState<'precision' | 'operation'>();
  const [selectionIndex, setIndex] = useState<number>(null);
  const [formatterElements, setFormatterElements] = useState<NumericFormatter>(
    initialState
  );
  const [format, setFormat] = useState(formatValue);
  const [error, setError] = useState({ hasError: false, message: '' });

  const { hasError, message: errorMessage } = error;

  useEffect(() => {
    const { separator, ...settings } = createFormatterSettings(
      formatValue,
      'number'
    ) as NumericFormatter;
    setFormatterElements((formatterElements) => ({
      ...formatterElements,
      ...settings,
    }));
  }, [formatValue]);

  const { precision, operation, value, separator } = formatterElements;

  useDebounce(() => onUpdateFormatValue(format), 300, [format]);

  const updateFormat = (values) => {
    const updatedState = {
      ...formatterElements,
      ...values,
    };
    setFormatterElements(updatedState);
    setFormat(serializeFormatterSettings(updatedState));
  };

  const patternsOptions = useMemo(
    () => [
      {
        label: t(DEFAULT_FORMATTER_PATTERN.label),
        value: DEFAULT_FORMATTER_PATTERN.value,
      },
      ...patterns,
    ],
    [patterns]
  );

  const patternOption =
    patternsOptions.find((p) => p.value === precision) || patternsOptions[0];
  const operationOption = operationsOptions.find((o) => o.value === operation);

  const isPrecisionOpen = dropdown === 'precision';
  const isOperationOpen = dropdown === 'operation';
  const precisionSpecified =
    precision && precision !== DEFAULT_FORMATTER_PATTERN.value;

  const onPrecisionChange = (_e, { value: precisionValue }) => {
    if (patternOption.value === DEFAULT_FORMATTER_PATTERN.value) {
      updateFormat({ separator: true });
    }
    if (precisionValue === DEFAULT_FORMATTER_PATTERN.value) {
      updateFormat({ separator: false });
    }
    updateFormat({ precision: precisionValue });
  };

  useEffect(() => {
    const { precision, operation } = formatterElements;
    let index = 0;

    if (isPrecisionOpen) {
      const precisionIndex = patternsOptions.findIndex(
        ({ value }) => value === precision
      );
      if (precisionIndex > 0) index = precisionIndex;
    }

    if (isOperationOpen) {
      const operationIndex = operationsOptions.findIndex(
        ({ value }) => value === operation
      );
      if (operationIndex > 0) index = operationIndex;
    }

    setIndex(index);

    return () => {
      setIndex(null);
    };
  }, [isPrecisionOpen, isOperationOpen]);

  const keyboardHandler = useCallback(
    (_e: KeyboardEvent, keyCode: number) => {
      switch (keyCode) {
        case KEYBOARD_KEYS.ENTER:
          if (isPrecisionOpen) {
            const { value } = patternsOptions[selectionIndex];
            onPrecisionChange(_e, { value });
          }

          if (isOperationOpen) {
            const { value } = operationsOptions[selectionIndex];
            updateFormat({ operation: value });
          }
          setDropdown(null);
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
            (isPrecisionOpen && selectionIndex < patternsOptions.length - 1) ||
            (isOperationOpen && selectionIndex < operationsOptions.length - 1)
          ) {
            setIndex(selectionIndex + 1);
          }
          break;
        case KEYBOARD_KEYS.ESCAPE:
          setDropdown(null);
          break;
      }
    },
    [selectionIndex, isPrecisionOpen, isOperationOpen]
  );

  useKeypress({
    keyboardAction: keyboardHandler,
    handledKeys: [
      KEYBOARD_KEYS.ENTER,
      KEYBOARD_KEYS.ESCAPE,
      KEYBOARD_KEYS.UP,
      KEYBOARD_KEYS.DOWN,
    ],
    addEventListenerCondition: isOperationOpen || isPrecisionOpen,
    eventListenerDependencies: [
      dropdown,
      selectionIndex,
      patternsOptions,
      operationsOptions,
    ],
  });

  return (
    <Container>
      <PrefixAndSuffix
        onChange={(values) => updateFormat({ ...values })}
        prefix={formatterElements.prefix}
        suffix={formatterElements.suffix}
      />
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_format_value_settings.precision')}
        </BodyText>
        <ControlContainer>
          <DropableContainer
            variant="secondary"
            placeholder={t(
              'widget_customization_format_value_settings.select_pattern_placeholder'
            )}
            onClick={() =>
              dropdown === 'precision'
                ? setDropdown(null)
                : setDropdown('precision')
            }
            isActive={isPrecisionOpen}
            value={patternOption.value}
            dropIndicator
            onDefocus={() => setDropdown(null)}
          >
            {patternOption.value === DEFAULT_FORMATTER_PATTERN.value ? (
              <BodyText
                variant="body2"
                color={transparentize(0.5, colors.black[100])}
              >
                {patternOption.label}
              </BodyText>
            ) : (
              patternOption.label
            )}
          </DropableContainer>
          <Dropdown isOpen={isPrecisionOpen}>
            <DropdownListContainer scrollToActive maxHeight={150}>
              {(activeItemRef) => (
                <DropdownList
                  ref={activeItemRef}
                  items={patternsOptions}
                  setActiveItem={({ value }) =>
                    patternsOptions[selectionIndex] &&
                    patternsOptions[selectionIndex].value === value
                  }
                  onClick={onPrecisionChange}
                />
              )}
            </DropdownListContainer>
          </Dropdown>
        </ControlContainer>
      </Row>
      <Row isDisabled={!precisionSpecified}>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_format_value_settings.calculate')}
        </BodyText>
        <MultiControl isDisabled={!precisionSpecified}>
          <ControlContainer>
            <DropableContainer
              variant="secondary"
              placeholder={t(
                'widget_customization_format_value_settings.select_operations_placeholder'
              )}
              onClick={() =>
                dropdown === 'operation'
                  ? setDropdown(null)
                  : setDropdown('operation')
              }
              isActive={isOperationOpen}
              value={operationOption?.value}
              dropIndicator
              onDefocus={() => setDropdown(null)}
              borderRadius="4px 0 0 4px"
            >
              {operationOption?.label}
            </DropableContainer>
            <Dropdown isOpen={isOperationOpen}>
              <DropdownListContainer scrollToActive maxHeight={150}>
                {(activeItemRef) => (
                  <DropdownList
                    ref={activeItemRef}
                    items={operationsOptions}
                    setActiveItem={({ value }) =>
                      operationsOptions[selectionIndex] &&
                      operationsOptions[selectionIndex].value === value
                    }
                    onClick={(_e, { value: operationValue }) => {
                      updateFormat({ operation: operationValue });
                    }}
                  />
                )}
              </DropdownListContainer>
            </Dropdown>
          </ControlContainer>
          <Input
            data-testid="input-value"
            value={value || ''}
            variant="solid"
            hasError={hasError}
            placeholder={t(
              'widget_customization_format_value_settings.value_placeholder'
            )}
            borderRadius="0 4px 4px 0"
            type="text"
            onChange={(e) => {
              const inputValue = e.currentTarget.value;
              if (inputValue.includes(',')) {
                setError({
                  hasError: true,
                  message:
                    'widget_customization_format_value_settings.use_dot_instead_of_comma',
                });
              }
              if (!isNaN(inputValue as any)) {
                updateFormat({
                  operation:
                    inputValue === '' ? null : formatterElements.operation,
                  value: inputValue,
                });
                setError({ hasError: false, message: '' });
              }
            }}
            onBlur={() => setError({ hasError: false, message: '' })}
          />
        </MultiControl>
      </Row>
      <Row marginTop="20px" marginBottom="5px" isDisabled={!precisionSpecified}>
        <StyledLabel htmlFor="separator" data-testid="separator">
          <Checkbox
            id="separator"
            disabled={!precisionSpecified}
            onChange={() => updateFormat({ separator: !separator })}
            checked={!!separator}
          />
          <LabelText>
            <BodyText variant="body2" fontWeight="bold">
              {t('widget_customization_format_value_settings.separator')}
            </BodyText>
          </LabelText>
        </StyledLabel>
      </Row>
      {hasError && (
        <Alert type="error" contentWidth>
          {t(errorMessage)}
        </Alert>
      )}
    </Container>
  );
};

export default NumericFormatter;
