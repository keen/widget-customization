/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState, useEffect, useMemo } from 'react';
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
  MousePositionedTooltip,
} from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';

import {
  Container,
  Row,
  MultiControl,
  ControlContainer,
  StyledLabel,
  LabelText,
} from './FormatValues.styles';

import { DEFAULT_FORMATTER_PATTERN } from '../../constants';
import {
  PATTERNS_OPTIONS as patterns,
  OPERATIONS_OPTIONS as operationsOptions,
  FULL_NUMBER_PATTERN,
} from './constants';
import { createFormatterSettings } from '../../utils';
import { serializeFormatterSettings } from '../../serializers';

import { FormatterSettings } from '../../types';

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

const FormatValues: FC<Props> = ({ formatValue, onUpdateFormatValue }) => {
  const { t } = useTranslation();

  const [dropdown, setDropdown] = useState<'precision' | 'operation'>();
  const [state, setState] = useState<FormatterSettings>(initialState);

  useEffect(() => {
    if (formatValue) {
      const settings = createFormatterSettings(formatValue);
      setState(settings);
    }
  }, []);

  useEffect(() => {
    const { separator, ...settings } = createFormatterSettings(formatValue);
    setState((state) => ({ ...state, ...settings }));
  }, [formatValue]);

  const { prefix, suffix, precision, operation, value, separator } = state;

  useDebounce(
    () => {
      const newFormatValue = serializeFormatterSettings({
        prefix,
        suffix,
        precision,
        operation,
        value,
        separator,
      });
      if (newFormatValue !== formatValue) {
        onUpdateFormatValue(newFormatValue);
      }
    },
    300,
    [state, formatValue]
  );

  const patternsOptions = useMemo(
    () => [
      {
        label: t(DEFAULT_FORMATTER_PATTERN.label),
        value: DEFAULT_FORMATTER_PATTERN.value,
      },
      ...patterns.map((pattern) => {
        if (pattern.value === FULL_NUMBER_PATTERN) {
          return {
            ...pattern,
            label: `${pattern.label} ${t(
              'widget_customization_format_value_settings.full_number'
            )}`,
          };
        }
        return pattern;
      }),
    ],
    [patterns]
  );

  const patternOption =
    patternsOptions.find((p) => p.value === precision) || patternsOptions[0];
  const operationOption = operationsOptions.find((o) => o.value === operation);

  const isPrecisionOpen = dropdown === 'precision';
  const isOperationOpen = dropdown === 'operation';

  const onPrecisionChange = (_e, { value: precisionValue }) => {
    if (patternOption.value === DEFAULT_FORMATTER_PATTERN.value) {
      setState((state) => ({ ...state, separator: true }));
    }
    if (precisionValue === DEFAULT_FORMATTER_PATTERN.value) {
      setState((state) => ({ ...state, separator: false }));
    }
    setState((state) => ({
      ...state,
      precision: precisionValue,
    }));
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
            onChange={(e) => {
              const inputValue = e.currentTarget.value;
              setState((state) => ({
                ...state,
                prefix: inputValue,
              }));
            }}
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
            onChange={(e) => {
              const inputValue = e.currentTarget.value;
              setState((state) => ({
                ...state,
                suffix: inputValue,
              }));
            }}
          />
        </ControlContainer>
      </Row>
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
                  setActiveItem={(item) => patternOption.value === item.value}
                  onClick={onPrecisionChange}
                />
              )}
            </DropdownListContainer>
          </Dropdown>
        </ControlContainer>
      </Row>
      <MousePositionedTooltip
        isActive={!precision}
        renderContent={() => (
          <BodyText variant="body2" color={colors.black[100]}>
            {t(
              'widget_customization_format_value_settings.select_precision_first'
            )}
          </BodyText>
        )}
      >
        <Row isDisabled={!precision}>
          <BodyText variant="body2" fontWeight="bold">
            {t('widget_customization_format_value_settings.calculate')}
          </BodyText>
          <MultiControl isDisabled={!precision}>
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
                      setActiveItem={(item) =>
                        operationOption?.value === item.value
                      }
                      onClick={(_e, { value: operationValue }) => {
                        setState((state) => ({
                          ...state,
                          operation: operationValue,
                        }));
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
              placeholder={t(
                'widget_customization_format_value_settings.value_placeholder'
              )}
              borderRadius="0 4px 4px 0"
              type="number"
              onChange={(e) => {
                const inputValue = e.currentTarget.value;
                setState((state) => ({
                  ...state,
                  operation: inputValue === '' ? null : state.operation,
                  value: inputValue,
                }));
              }}
            />
          </MultiControl>
        </Row>
        <Row marginTop="20px" marginBottom="5px" isDisabled={!precision}>
          <StyledLabel htmlFor="separator" data-testid="separator">
            <Checkbox
              id="separator"
              disabled={!precision}
              onChange={() =>
                setState((state) => ({ ...state, separator: !separator }))
              }
              checked={!!separator}
            />
            <LabelText>
              <BodyText variant="body2" fontWeight="bold">
                {t('widget_customization_format_value_settings.separator')}
              </BodyText>
            </LabelText>
          </StyledLabel>
        </Row>
      </MousePositionedTooltip>
    </Container>
  );
};

export default FormatValues;
