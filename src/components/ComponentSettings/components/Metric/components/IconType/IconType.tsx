import React, { FC, useRef, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DropableContainer,
  Dropdown,
  DropdownList,
  DropdownListContainer,
  DynamicPortal,
  KEYBOARD_KEYS,
} from '@keen.io/ui-core';
import { useDynamicContentPosition, useKeypress } from '@keen.io/react-hooks';

import { AvailableIcons } from '../../../../../../constants';
import Label from '../../../../../Label';
import Row from '../../../../../Row';

import { DropdownWrapper, DropableContainerWrapper } from './IconType.styles';

type Props = {
  /** Value mode */
  iconType: string;
  /** Update settings event handler */
  onChange: (settings) => void;
};

const IconType: FC<Props> = ({ onChange, iconType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectionIndex, setIndex] = useState<number>(null);

  const IconTypeOptions = AvailableIcons.map((icon) => ({
    label: icon.charAt(0).toUpperCase() + icon.slice(1),
    value: icon,
  }));

  const selectedIcon = AvailableIcons.includes(iconType)
    ? IconTypeOptions.find((icon) => icon.value === iconType)
    : IconTypeOptions[0];

  const containerRef = useRef(null);
  const { t } = useTranslation();

  const { setPosition, contentPosition } = useDynamicContentPosition(
    containerRef
  );

  useEffect(() => {
    if (dropdownOpen) {
      const iconIndex = IconTypeOptions.findIndex(
        ({ value }) => value === iconType
      );
      const index = iconIndex > 0 ? iconIndex : 0;

      setIndex(index);
    }
    return () => {
      setIndex(null);
    };
  }, [dropdownOpen]);

  const keyboardHandler = useCallback(
    (_e: KeyboardEvent, keyCode: number) => {
      switch (keyCode) {
        case KEYBOARD_KEYS.ENTER:
          const { value } = IconTypeOptions[selectionIndex];
          onChange(value);
          setDropdownOpen(false);
          break;
        case KEYBOARD_KEYS.UP:
          if (selectionIndex > 0) {
            setIndex(selectionIndex - 1);
          }
          break;
        case KEYBOARD_KEYS.DOWN:
          if (selectionIndex === null) {
            setIndex(0);
          } else if (selectionIndex < IconTypeOptions.length - 1) {
            setIndex(selectionIndex + 1);
          }
          break;
        case KEYBOARD_KEYS.ESCAPE:
          setDropdownOpen(false);
          break;
      }
    },
    [selectionIndex, IconTypeOptions]
  );

  useKeypress({
    keyboardAction: keyboardHandler,
    handledKeys: [
      KEYBOARD_KEYS.ENTER,
      KEYBOARD_KEYS.ESCAPE,
      KEYBOARD_KEYS.UP,
      KEYBOARD_KEYS.DOWN,
    ],
    addEventListenerCondition: dropdownOpen,
    eventListenerDependencies: [dropdownOpen, selectionIndex, IconTypeOptions],
  });

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
                    setActiveItem={({ value }) =>
                      IconTypeOptions[selectionIndex] &&
                      value === IconTypeOptions[selectionIndex].value
                    }
                    onClick={(_e, icon) => onChange(icon.value)}
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
