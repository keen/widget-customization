import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Section = styled.div`
  padding: 10px 20px;
  width: 100%;
`;

export const Layout = styled.div`
  position: relative;
  display: flex;
  background: ${colors.white[500]};
  min-height: 360px;
`;

export const SideMenuWrapper = styled.div`
  width: 160px;
  padding: 10px;
  border-right: 1px solid ${colors.gray[200]};
`;

export const HeadingSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 550px;
`;
