import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const InputContainer = styled.div`
  width: 100%;
  max-width: 450px;
`;

export const UseQueryName = styled.div`
  height: 35px;
  padding: 0 10px;
  margin-bottom: 10px;

  display: flex;
  align-items: center;

  background: ${colors.gray[100]};
  cursor: pointer;

  transition: background 0.2s linear;

  &:hover {
    background: ${colors.gray[300]};
  }

  &:focus-visible {
    outline: 1px solid ${colors.lightBlue[500]};
  }
`;

export const QueryIcon = styled.span`
  margin-left: auto;
  transform: rotate(90deg);
`;
