import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { transparentize } from 'polished';
import { useTranslation } from 'react-i18next';

import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import {
  IconWrapper,
  PaginationWarning,
  TextWrapper,
} from './DisabledPaginationInfo.styles';
import { paginationSettingsMotion } from '../../motion';

type Props = {
  /** Is pagination disabled */
  paginationDisabled: boolean;
};

const DisabledPaginationInfo: FC<Props> = ({ paginationDisabled }) => {
  const { t } = useTranslation();
  return (
    <AnimatePresence initial={false}>
      {paginationDisabled && (
        <motion.div
          {...paginationSettingsMotion}
          style={{ overflow: 'hidden' }}
        >
          <PaginationWarning>
            <IconWrapper>
              <Icon
                type="info"
                width={14}
                height={14}
                fill={transparentize(0.2, colors.black[100])}
              />
            </IconWrapper>
            <TextWrapper>
              <BodyText variant="body3" fontWeight={400}>
                {t(
                  'widget_customization_table_settings.disabled_pagination_info'
                )}
              </BodyText>
            </TextWrapper>
          </PaginationWarning>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DisabledPaginationInfo;
