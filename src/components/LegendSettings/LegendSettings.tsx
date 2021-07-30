import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LegendSettings } from '@keen.io/widgets';
import { Toggle, RadioSelect, Position, Alignment } from '@keen.io/ui-core';

import { Container } from './LegendSettings.styles';
import { legendMotion } from './motion';

import Row from '../Row';
import Label from '../Label';

import { getLayoutForPosition } from './utils';

import {
  POSITION_SETTINGS,
  VERTICAL_ALIGNMENT_SETTINGS,
  HORIZONTAL_ALIGNMENT_SETTINGS,
} from './constants';

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
    <AnimatePresence initial={false}>
      {isEnabled && (
        <motion.div {...legendMotion} style={{ overflow: 'hidden' }}>
          <Row>
            <Label>{positionLabel}</Label>
            <RadioSelect
              activeItem={position}
              items={POSITION_SETTINGS}
              onClick={({ value }) => {
                const position = value as Position;
                onChange({ position, layout: getLayoutForPosition(position) });
              }}
            />
            {alignment && (
              <RadioSelect
                activeItem={alignment}
                items={
                  ['left', 'right'].includes(position)
                    ? VERTICAL_ALIGNMENT_SETTINGS
                    : HORIZONTAL_ALIGNMENT_SETTINGS
                }
                onClick={({ value }) => {
                  const alignment = value as Alignment;
                  onChange({ alignment });
                }}
              />
            )}
          </Row>
        </motion.div>
      )}
    </AnimatePresence>
  </Container>
);

export default LegendSettings;
