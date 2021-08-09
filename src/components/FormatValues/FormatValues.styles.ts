import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-width: 320px;
`;

const mixin = css`
  width: 100%;
  max-width: 240px;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${mixin};
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`;

export const ControlContainer = styled.div`
  ${mixin};
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
