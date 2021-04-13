import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 550px;
`;

export const InputContainer = styled.div`
  width: 100%;
  max-width: 450px;
`;

export const FieldGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
`;

export const QueryIcon = styled.span`
  margin-left: auto;
  transform: rotate(90deg);
`;
