import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trans } from 'react-i18next';

import {
  DropableContainer,
  Dropdown,
  DropdownList,
  DropdownListContainer,
  DynamicPortal,
  KEYBOARD_KEYS,
  PER_PAGE_OPTIONS,
} from '@keen.io/ui-core';
import { useDynamicContentPosition, useKeypress } from '@keen.io/react-hooks';

import Label from '../../../../../Label';
import Row from '../../../../../Row';

import { paginationSettingsMotion } from '../../motion';

import {
  DroppableContainerWrapper,
  DropdownWrapper,
  RowsPerPageWrapper,
} from './RowsPerPage.styles';
import { DisabledPaginationInfo } from './components';

export type Props = {
  /** Value mode */
  rowsPerPage: typeof PER_PAGE_OPTIONS[number];
  /** Update settings event handler */
  onChange: (settings) => void;
  /** Is pagination enabled */
  isPaginationEnabled: boolean;
};

const RowsPerPage: FC<Props> = ({
  onChange,
  rowsPerPage,
  isPaginationEnabled,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectionIndex, setIndex] = useState<number>(null);
  const PerPageOptions = PER_PAGE_OPTIONS.map((rowsPerPage) => ({
    label: rowsPerPage.toString(),
    value: rowsPerPage,
  }));

  const selectedRowsPerPage = PER_PAGE_OPTIONS.includes(rowsPerPage)
    ? PerPageOptions.find(
        (rowsPerPageOption) => rowsPerPageOption.value === rowsPerPage
      )
    : PerPageOptions[0];

  const containerRef = useRef(null);

  const { setPosition, contentPosition } = useDynamicContentPosition(
    containerRef
  );

  useEffect(() => {
    if (dropdownOpen) {
      const rowsPerPageIndex = PerPageOptions.findIndex(
        ({ value }) => value === rowsPerPage
      );
      const index = rowsPerPageIndex > 0 ? rowsPerPageIndex : 0;

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
          const { value } = PerPageOptions[selectionIndex];
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
          } else if (selectionIndex < PerPageOptions.length - 1) {
            setIndex(selectionIndex + 1);
          }
          break;
        case KEYBOARD_KEYS.ESCAPE:
          setDropdownOpen(false);
          break;
      }
    },
    [selectionIndex, PerPageOptions]
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
    eventListenerDependencies: [dropdownOpen, selectionIndex, PerPageOptions],
  });

  return (
    <RowsPerPageWrapper>
      <DisabledPaginationInfo paginationDisabled={!isPaginationEnabled} />
      <AnimatePresence initial={false}>
        {isPaginationEnabled && (
          <motion.div
            {...paginationSettingsMotion}
            style={{ overflow: 'hidden' }}
          >
            <Row>
              <Label>
                <Trans
                  i18nKey={
                    'widget_customization_table_settings.default_number_of_rows_per_page'
                  }
                />
              </Label>
              <DroppableContainerWrapper ref={containerRef}>
                <DropableContainer
                  variant="secondary"
                  onClick={() => {
                    setPosition();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  isActive={dropdownOpen}
                  value={selectedRowsPerPage.toString()}
                  dropIndicator
                  onDefocus={() => setDropdownOpen(false)}
                >
                  {selectedRowsPerPage.label}
                </DropableContainer>
              </DroppableContainerWrapper>
              <DynamicPortal>
                <DropdownWrapper
                  x={contentPosition.x}
                  y={contentPosition.y}
                  data-testid="rows-per-page-select"
                >
                  <Dropdown isOpen={dropdownOpen}>
                    <DropdownListContainer scrollToActive maxHeight={150}>
                      {(activeItemRef) => (
                        <DropdownList
                          ref={activeItemRef}
                          items={PerPageOptions}
                          setActiveItem={({ value }) =>
                            PerPageOptions[selectionIndex] &&
                            value === PerPageOptions[selectionIndex].value
                          }
                          onClick={(_e, rowsPerPage) =>
                            onChange(rowsPerPage.value)
                          }
                        />
                      )}
                    </DropdownListContainer>
                  </Dropdown>
                </DropdownWrapper>
              </DynamicPortal>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </RowsPerPageWrapper>
  );
};

export default RowsPerPage;
