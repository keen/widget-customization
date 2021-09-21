import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DropableContainer,
  Dropdown,
  DropdownList,
  DropdownListContainer,
  DynamicPortal,
} from '@keen.io/ui-core';
import { useDynamicContentPosition } from '@keen.io/react-hooks';

import Label from '../../../../../Label';
import Row from '../../../../../Row';

import { DropdownWrapper, DropableContainerWrapper } from './IconType.styles';
import { AvailableIcons } from './constants';

type Props = {
  /** Value mode */
  iconType: string;
  /** Update settings event handler */
  onChange: (settings) => void;
};

const IconType: FC<Props> = ({ onChange, iconType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const IconTypeOptions = AvailableIcons.map((icon) => ({
    label: icon.charAt(0).toUpperCase() + icon.slice(1),
    value: icon,
  }));

  const selectedIcon = AvailableIcons.includes(iconType as any)
    ? IconTypeOptions.find((icon) => icon.value === iconType)
    : IconTypeOptions[0];

  const containerRef = useRef(null);
  const { t } = useTranslation();

  const { setPosition, contentPosition } = useDynamicContentPosition(
    containerRef
  );

  return (
    <div>
      <Row>
        <Label>{t('widget_customization_metric_settings.icon')}</Label>
        <DropableContainerWrapper ref={containerRef}>
          <DropableContainer
            variant="secondary"
            onClick={() => {
              setPosition();
              setDropdownOpen(!dropdownOpen);
            }}
            isActive={dropdownOpen}
            value={selectedIcon.value}
            dropIndicator
            onDefocus={() => setDropdownOpen(false)}
          >
            {selectedIcon.label}
          </DropableContainer>
        </DropableContainerWrapper>
        <DynamicPortal>
          <DropdownWrapper x={contentPosition.x} y={contentPosition.y}>
            <Dropdown isOpen={dropdownOpen}>
              <DropdownListContainer scrollToActive maxHeight={150}>
                {(activeItemRef) => (
                  <DropdownList
                    ref={activeItemRef}
                    items={IconTypeOptions}
                    setActiveItem={(item) =>
                      selectedIcon && selectedIcon.value === item.value
                    }
                    onClick={(e, icon) => onChange(icon.value)}
                  />
                )}
              </DropdownListContainer>
            </Dropdown>
          </DropdownWrapper>
        </DynamicPortal>
      </Row>
    </div>
  );
};

export default IconType;
