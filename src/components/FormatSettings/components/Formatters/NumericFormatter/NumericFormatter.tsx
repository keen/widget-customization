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
  const [formatterElements, setFormatterElements] = useState<NumericFormatter>(
    initialState
  );
  const [format, setFormat] = useState(formatValue);

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

  const onPrecisionChange = (_e, { value: precisionValue }) => {
    if (patternOption.value === DEFAULT_FORMATTER_PATTERN.value) {
      updateFormat({ separator: true });
    }
    if (precisionValue === DEFAULT_FORMATTER_PATTERN.value) {
      updateFormat({ separator: false });
    }
    updateFormat({ precision: precisionValue });
  };

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
              placeholder={t(
                'widget_customization_format_value_settings.value_placeholder'
              )}
              borderRadius="0 4px 4px 0"
              type="number"
              onChange={(e) => {
                const inputValue = e.currentTarget.value;
                updateFormat({
                  operation:
                    inputValue === '' ? null : formatterElements.operation,
                  value: inputValue,
                });
              }}
            />
          </MultiControl>
        </Row>
        <Row marginTop="20px" marginBottom="5px" isDisabled={!precision}>
          <StyledLabel htmlFor="separator" data-testid="separator">
            <Checkbox
              id="separator"
              disabled={!precision}
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
      </MousePositionedTooltip>
    </Container>
  );
};

export default NumericFormatter;
