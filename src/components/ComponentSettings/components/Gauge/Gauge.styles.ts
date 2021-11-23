import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const CurrentValue = styled.div`
  display: inline-block;
  background-color: ${colors.gray[100]};
  padding: 10px;
`;

export const InputContainer = styled.div`
  width: 100%;
  max-width: 140px;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const FieldsWrapper = styled.div`
  margin-top: 10px;
  max-width: 250px;
  width: 100%;
`;
