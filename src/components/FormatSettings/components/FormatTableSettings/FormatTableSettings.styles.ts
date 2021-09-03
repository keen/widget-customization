import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export const Container = styled.div`
  display: flex;
`;

export const SettingsColumn = styled.div`
  max-width: 500px;
  padding-right: 72px;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const InputWrapper = styled.div`
  max-width: 310px;
  width: 100%;
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

export const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
