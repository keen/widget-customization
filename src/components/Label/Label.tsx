import React, { FC } from 'react';
import { BodyText } from '@keen.io/typography';

import { Container } from './Label.styles';

type Props = {
  /* Children nodes */
  children: React.ReactNode;
};

const Label: FC<Props> = ({ children }) => (
  <Container>
    <BodyText variant="body2" fontWeight="bold">
      {children}
    </BodyText>
  </Container>
);

export default Label;
