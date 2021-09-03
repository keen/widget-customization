import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';

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

export const InputWrapper = styled.div`
  max-width: 310px;
  width: 100%;
`;

export const ControlContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  max-width: 310px;
  display: flex;
  column-gap: 10px;
`;
