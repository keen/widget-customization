import styled, { css } from 'styled-components';
import { space, SpaceProps } from 'styled-system';
import { transparentize } from 'polished';

import { colors } from '@keen.io/colors';

const mixin = css`
  max-width: 500px;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const Container = styled.div`
  display: flex;
  min-height: 320px;
`;

export const SettingsColumnLeft = styled.div`
  ${mixin};
  padding-right: 72px;
`;

export const SettingsColumnRight = styled.div`
  ${mixin};
  border-left: 1px solid ${colors.gray[300]};
  padding-left: 20px;
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

export const ControlContainer = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`;

export const SelectColumnInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SelectColumnInfo = styled.div`
  margin-top: 20px;
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${transparentize(0.8, colors.green[100])};
  border: 1px solid ${colors.green[100]};
  border-radius: 4px;
  box-sizing: border-box;
  height: 63px;
`;

export const InfoIconWrapper = styled.div`
  margin-right: 10px;
`;

export const FormatInfo = styled.div`
  background: ${colors.lightBlue[100]};
  border-left: 3px solid ${colors.lightBlue[400]};
  padding: 10px;
`;
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TitleActions = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 10px;
  }
`;

export const DropdownInfo = styled.div`
  padding: 10px 13px;
  background: ${colors.gray[100]};
`;
