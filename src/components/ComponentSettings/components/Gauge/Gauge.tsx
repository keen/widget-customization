import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyText, FontWeight } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { Alert, Input, Label } from '@keen.io/ui-core';

import SectionTitle from '../../../SectionTitle';
import FieldGroup from '../../../FieldGroup';
import { CurrentValue, InputContainer, FieldsWrapper } from './Gauge.styles';

import { SettingsModifier } from '../types';

const GaugeSettings: FC<SettingsModifier> = ({
  chartSettings,
  onUpdateChartSettings,
  analysisResult,
}) => {
  const { t } = useTranslation();
  const { minValue = 0, maxValue } = chartSettings;
  const [values, setValues] = useState({
    minimalValue: minValue.toString(),
    targetValue: maxValue?.toString() || '',
  });
  const [error, setError] = useState({ hasError: false, message: '' });

  const { minimalValue, targetValue } = values;
  const { hasError, message: errorMessage } = error;

  const validateFields = useCallback(
    (minimalValue: string, targetValue?: string) => {
      if (targetValue === '' || targetValue === 'auto')
        return setError({
          hasError: true,
          message:
            'widget_customization_gauge_settings.validation_target_value',
        });
      if (minimalValue === '' || targetValue === 'auto')
        return setError({
          hasError: true,
          message:
            'widget_customization_gauge_settings.validation_minimal_value',
        });
      if (+targetValue <= +minimalValue)
        return setError({
          hasError: true,
          message: 'widget_customization_gauge_settings.validation',
        });

      setError({ hasError: false, message: '' });
      onUpdateChartSettings({
        ...chartSettings,
        minValue: +minimalValue,
        maxValue: +targetValue,
      });
    },
    [minimalValue, targetValue]
  );

  return (
    <div>
      <SectionTitle title={t('widget_customization_gauge_settings.title')} />
      {typeof analysisResult === 'number' && (
        <CurrentValue>
          <BodyText
            variant="body3"
            color={colors.black[100]}
            fontWeight="normal"
          >
            {`${t('widget_customization_gauge_settings.current_value')}: `}
            <FontWeight fontWeight="bold">{analysisResult}</FontWeight>
          </BodyText>
        </CurrentValue>
      )}
      <FieldsWrapper>
        <FieldGroup>
          <Label variant="secondary" hasError={hasError && !minimalValue}>
            {t('widget_customization_gauge_settings.minimal_value')}
          </Label>
          <InputContainer>
            <Input
              variant="solid"
              type="number"
              hasError={hasError && !minimalValue}
              value={minimalValue}
              onKeyDown={(e) => {
                if (e.key === ',') {
                  e.preventDefault();
                  setError({
                    hasError: true,
                    message:
                      'widget_customization_gauge_settings.validation_comma',
                  });
                }
              }}
              onChange={(e) => {
                e.persist();
                const inputValue = e.currentTarget.value;
                if (!isNaN(inputValue as any)) {
                  setValues((state) => ({
                    ...state,
                    minimalValue: inputValue,
                  }));
                  validateFields(inputValue, targetValue);
                }
              }}
              onBlur={() => {
                validateFields(minimalValue, targetValue);
              }}
            />
          </InputContainer>
        </FieldGroup>
        <FieldGroup>
          <Label variant="secondary" hasError={hasError && !targetValue}>
            {t('widget_customization_gauge_settings.target_value')}
          </Label>
          <InputContainer>
            <Input
              placeholder={t(
                'widget_customization_gauge_settings.target_value_placeholder'
              )}
              variant="solid"
              type="number"
              hasError={hasError && !targetValue}
              value={targetValue}
              onKeyDown={(e) => {
                if (e.key === ',') {
                  e.preventDefault();
                  setError({
                    hasError: true,
                    message:
                      'widget_customization_gauge_settings.validation_comma',
                  });
                }
              }}
              onChange={(e) => {
                e.persist();
                const inputValue = e.currentTarget.value;
                if (!isNaN(inputValue as any)) {
                  setValues((state) => ({ ...state, targetValue: inputValue }));
                  validateFields(minimalValue, inputValue);
                }
              }}
              onBlur={() => {
                validateFields(minimalValue, targetValue);
              }}
            />
          </InputContainer>
        </FieldGroup>
      </FieldsWrapper>
      {hasError && (
        <Alert type="error" contentWidth>
          {t(errorMessage)}
        </Alert>
      )}
    </div>
  );
};

export default GaugeSettings;
