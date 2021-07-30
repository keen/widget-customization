import React, { FC } from 'react';
import { LegendSettings } from '@keen.io/widgets';
import { Toggle, RadioSelect, Position, Alignment } from '@keen.io/ui-core';

import {
  Container,
  PositionContainer,
  AlignmentContainer,
} from './LegendSettings.styles';

import Row from '../Row';
import Label from '../Label';

import { getLayoutForPosition } from './utils';

import { POSITION_SETTINGS, ALIGNMENT_SETTINGS } from './constants';

type Props = {
  /* Settings title */
  label: string;
  /* Legend position label */
  positionLabel: string;
  /** Legend component state */
  isEnabled: boolean;
  /** Component position */
  position: Position;
  /** Alignment settings */
  alignment?: Alignment;
  /** Update settings event handler */
  onChange: (settings: Partial<LegendSettings>) => void;
};

const LegendSettings: FC<Props> = ({
  label,
  isEnabled,
  alignment,
  position,
  positionLabel,
  onChange,
}) => (
  <Container>
    <Row>
      <Label>{label}</Label>
      <Toggle
        isOn={isEnabled}
        onChange={(legendEnabled) => onChange({ enabled: legendEnabled })}
      />
    </Row>
    {isEnabled && (
      <Row>
        <Label>{positionLabel}</Label>
        <PositionContainer>
          <RadioSelect
            activeItem={position}
            items={POSITION_SETTINGS}
            onClick={({ value }) => {
              const position = value as Position;
              onChange({ position, layout: getLayoutForPosition(position) });
            }}
          />
        </PositionContainer>
        {alignment && (
          <AlignmentContainer>
            <RadioSelect
              activeItem={alignment}
              items={ALIGNMENT_SETTINGS}
              onClick={({ value }) => {
                const alignment = value as Alignment;
                onChange({ alignment });
              }}
            />
          </AlignmentContainer>
        )}
      </Row>
    )}
  </Container>
);

export default LegendSettings;
