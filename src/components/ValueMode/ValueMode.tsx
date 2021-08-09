import React, { FC } from 'react';
import { RadioSelect } from '@keen.io/ui-core';

import Row from '../Row';
import Label from '../Label';

import { Container, ValueModeContainer } from './ValueMode.styles';

import { CircularChartValueMode } from '../../types';

import { VALUE_MODE_SETTINGS } from './constants';

type Props = {
  /** Value mode title */
  label: string;
  /** Value mode */
  valueMode: CircularChartValueMode;
  /** Update settings event handler */
  onChange: (settings) => void;
};

const ValueMode: FC<Props> = ({ label, valueMode, onChange }) => {
  return (
    <Container>
      <Row>
        <Label>{label}</Label>
        <ValueModeContainer>
          <RadioSelect
            activeItem={valueMode}
            items={VALUE_MODE_SETTINGS}
            onClick={({ value }) => {
              const valueMode = value as CircularChartValueMode;
              onChange({ valueMode });
            }}
          />
        </ValueModeContainer>
      </Row>
    </Container>
  );
};

export default ValueMode;
