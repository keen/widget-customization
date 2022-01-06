import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const PaginationWarning = styled.div`
  min-height: 37px;
  padding: 10px 15px;
  margin-top: 10px;
  max-width: 390px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  gap: 10px;
  background: ${colors.gray[100]};
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
`;

export const TextWrapper = styled.div`
  margin-top: 1px;
`;
