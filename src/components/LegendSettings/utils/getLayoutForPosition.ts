import { Position, Layout } from '@keen.io/ui-core';

/**
 * Get legend layout based on component position
 * @param position - legend position
 *
 * @return layout type
 *
 */
const getLayoutForPosition = (position: Position): Layout => {
  switch (position) {
    case 'top':
    case 'bottom':
      return 'horizontal';
    case 'left':
    case 'right':
      return 'vertical';
  }
};

export default getLayoutForPosition;
