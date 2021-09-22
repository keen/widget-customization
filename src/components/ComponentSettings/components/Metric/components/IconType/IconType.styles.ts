import styled from 'styled-components';

export const DropdownWrapper = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  min-width: 152px;
`;

export const DropableContainerWrapper = styled.div`
  min-width: 152px;
`;
