/**
 * Kanban Board Component
 *
 * High-level component that composes the Kanban board with all features.
 */

import React, { useMemo } from 'react';
import type { KanbanBoardProps } from '../types';
import { KanbanContext } from '../context';
import { KanbanColumnView } from './KanbanColumnView';
import { KanbanCardView } from './KanbanCardView';
import { useKanbanDnd } from '../hooks/useKanbanDnd';

export function KanbanBoard({
  state,
  onDragEnd,
  onDragStart,
  renderColumn,
  renderCard,
  getCardKey,
  getColumnKey,
  isDragDisabled,
  className,
  style,
}: KanbanBoardProps) {
  const dragState = useKanbanDnd({
    state,
    onDragEnd,
    onDragStart,
    disabled: false,
  });

  const contextValue = useMemo(
    () => ({
      state,
      dragState,
      isDragDisabled,
    }),
    [state, dragState, isDragDisabled]
  );

  const defaultGetCardKey = (card: any) => card.id;
  const defaultGetColumnKey = (column: any) => column.id;

  const cardKeyExtractor = getCardKey || defaultGetCardKey;
  const columnKeyExtractor = getColumnKey || defaultGetColumnKey;

  return (
    <KanbanContext.Provider value={contextValue}>
      <div
        className={className}
        style={{
          display: 'flex',
          gap: '16px',
          ...style,
        }}
      >
        {state.columns.map((column, columnIndex) => (
          <KanbanColumnView
            key={columnKeyExtractor(column)}
            column={column}
            cardIds={column.cardIds}
            index={columnIndex}
            isDragDisabled={isDragDisabled?.(column.id, 'COLUMN')}
          >
            {(columnProvided, columnSnapshot) => (
              <div
                ref={columnProvided.innerRef as any}
                {...columnProvided.draggableProps}
                style={{
                  minWidth: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  ...columnProvided.draggableProps.style,
                }}
              >
                {/* Column header (draggable) */}
                <div {...columnProvided.dragHandleProps}>
                  {renderColumn(column, columnProvided, columnSnapshot)}
                </div>

                {/* Card drop zone */}
                <div
                  ref={(columnProvided as any).dropZoneRef}
                  style={{
                    flex: 1,
                    minHeight: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {column.cardIds.map((cardId, cardIndex) => {
                    const card = state.cards[cardId];
                    if (!card) return null;

                    return (
                      <KanbanCardView
                        key={cardKeyExtractor(card)}
                        card={card}
                        index={cardIndex}
                        columnId={column.id}
                        isDragDisabled={isDragDisabled?.(card.id, 'CARD')}
                      >
                        {(cardProvided, cardSnapshot) => (
                          <div
                            ref={cardProvided.innerRef as any}
                            {...cardProvided.draggableProps}
                            {...cardProvided.dragHandleProps}
                          >
                            {renderCard(card, cardProvided, cardSnapshot)}
                          </div>
                        )}
                      </KanbanCardView>
                    );
                  })}
                </div>
              </div>
            )}
          </KanbanColumnView>
        ))}
      </div>
    </KanbanContext.Provider>
  );
}
