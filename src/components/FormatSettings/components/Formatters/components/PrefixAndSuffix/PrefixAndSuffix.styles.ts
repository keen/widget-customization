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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const ControlContainer = styled.div`
  width: 100%;
  max-width: 310px;
`;
