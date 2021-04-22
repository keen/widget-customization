import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Section = styled.div`
  padding: 10px 20px;
  flex-basis: 50%;
`;

export const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${colors.white[500]};

  @media (min-width: 600px) {
    flex-direction: row;

    ${Section} + ${Section} {
      border-left: solid 1px ${colors.white[300]};
    }
  }
`;
