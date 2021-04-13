import React, { FC } from 'react';

import { Container, Mask } from './SettingsContainer.styles';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /** Disable indicator */
  isDisabled?: boolean;
};

const SettingsContainer: FC<Props> = ({ children, isDisabled }) => (
  <Container data-testid="settings-container">
    {isDisabled && <Mask />}
    {children}
  </Container>
);

export default SettingsContainer;
