import styled, { css } from 'styled-components';

export const Container = styled.div``;

const mixin = css`
  width: 100%;
  max-width: 240px;
`;

export const Row = styled.div`
  display: flex;
  max-width: 310px;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
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
