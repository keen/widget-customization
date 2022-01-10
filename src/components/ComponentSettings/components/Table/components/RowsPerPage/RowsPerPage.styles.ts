import styled from 'styled-components';

export const DropdownWrapper = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  min-width: 152px;
`;

export const DroppableContainerWrapper = styled.div`
  min-width: 152px;
`;

export const RowsPerPageWrapper = styled.div`
  height: 50px;
`;
