import React, { FC, useRef, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Input,
  DropableContainer,
  DropdownListContainer,
  Dropdown,
  DropdownList,
} from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';

import {
  Container,
  Row,
  MultiControl,
  ControlContainer,
} from './FormatValues.styles';

import SectionTitle from '../SectionTitle';

import {
  PATTERNS_OPTIONS as patterns,
  OPERATIONS_OPTIONS as operationsOptions,
  DEFAULT_PATTERN,
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
};

const FormatValues: FC<Props> = ({ formatValue, onUpdateFormatValue }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const [dropdown, setDropdown] = useState<'precision' | 'operation'>();
  const [state, setState] = useState<FormatterSettings>(initialState);

  useEffect(() => {
    const settings = createFormatterSettings(formatValue);
    setState({ ...initialState, ...settings });
  }, [formatValue]);

  const { prefix, suffix, precision, operation, value } = state;

  const patternsOptions = useMemo(
    () => [
      { label: t(DEFAULT_PATTERN.label), value: DEFAULT_PATTERN.value },
      ...patterns,
    ],
    [patterns]
  );

  const patternOption =
    patternsOptions.find((p) => p.value === precision) || patternsOptions[0];
  const operationOption = operationsOptions.find((o) => o.value === operation);

  const isPrecisionOpen = dropdown === 'precision';
  const isOperationOpen = dropdown === 'operation';

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
        value={formatValue || ''}
        ref={inputRef}
        variant="solid"
        onChange={(e) => {
          const value = e.currentTarget.value ? e.currentTarget.value : null;
          onUpdateFormatValue(value);
        }}
      />
      <Row>
        <BodyText variant="body2" fontWeight="bold">
          {t('widget_customization_format_value_settings.prefix')}
        </BodyText>
        <ControlContainer>
          <Input
            value={prefix || ''}
            variant="solid"
            placeholder={t(
              'widget_customization_format_value_settings.text_placeholder'
            )}
            onChange={(e) => {
              const settings = serializeFormatterSettings({
                prefix: e.currentTarget.value,
                suffix,
                precision,
                operation,
                value,
              });
              onUpdateFormatValue(settings);
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
            value={suffix || ''}
            variant="solid"
            disabled={!precision}
            placeholder={t(
              'widget_customization_format_value_settings.text_placeholder'
            )}
            onChange={(e) => {
              const settings = serializeFormatterSettings({
                prefix,
                suffix: e.currentTarget.value,
                precision,
                operation,
                value,
              });
              onUpdateFormatValue(settings);
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
            {patternOption.label}
          </DropableContainer>
          <Dropdown isOpen={isPrecisionOpen}>
            <DropdownListContainer scrollToActive maxHeight={150}>
              {(activeItemRef) => (
                <DropdownList
                  ref={activeItemRef}
                  items={patternsOptions}
                  setActiveItem={(item) => patternOption.value === item.value}
                  onClick={(_e, { value: precisionValue }) => {
                    const settings = serializeFormatterSettings({
                      prefix,
                      suffix,
                      precision: precisionValue,
                      operation,
                      value,
                    });
                    onUpdateFormatValue(settings);
                  }}
                />
              )}
            </DropdownListContainer>
          </Dropdown>
        </ControlContainer>
      </Row>
      <Row>
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
                      if (operationValue && value) {
                        const settings = serializeFormatterSettings({
                          prefix,
                          suffix,
                          precision,
                          operation: operationValue,
                          value,
                        });
                        onUpdateFormatValue(settings);
                      }
                    }}
                  />
                )}
              </DropdownListContainer>
            </Dropdown>
          </ControlContainer>
          <Input
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
                value: inputValue,
              }));
              if (operation) {
                const settings = serializeFormatterSettings({
                  prefix,
                  suffix,
                  precision,
                  operation,
                  value: inputValue,
                });
                onUpdateFormatValue(settings);
              }
            }}
          />
        </MultiControl>
      </Row>
    </Container>
  );
};

export default FormatValues;
