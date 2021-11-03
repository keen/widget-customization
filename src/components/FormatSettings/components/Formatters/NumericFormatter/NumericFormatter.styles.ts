import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-width: 500px;
`;

export const Row = styled.div<SpaceProps & { isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;

  ${space};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`;

export const MultiControl = styled.div<{ isDisabled: boolean }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  max-width: 310px;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`;

export const ControlContainer = styled.div`
  width: 100%;
  max-width: 310px;
`;

export const StyledLabel = styled.label`
  cursor: pointer;
  margin: 0;
  padding: 0;
  line-height: 1;
`;

export const LabelText = styled.span`
  margin-left: 5px;
  display: inline-block;
`;

export const TooltipWrapper = styled(motion.div)`
  width: 100%;
  position: absolute;
  top: 45px;
`;
