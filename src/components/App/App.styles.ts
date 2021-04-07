import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Section = styled.div`
  padding: 10px 20px;
  flex-basis: 50%;
`;

export const CustomizationDisabled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${transparentize(0.15, colors.white[500])};

  padding: 25px 15px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

export const Layout = styled.div`
  position: relative;
  display: flex;
  background: ${colors.white[500]};

  ${Section} + ${Section} {
    border-left: solid 1px ${colors.white[300]};
  }
`;
