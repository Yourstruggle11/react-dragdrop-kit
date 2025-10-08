/**
 * Accessible Kanban Example
 *
 * Demonstrates accessibility features with:
 * - Screen reader announcements (via AnnouncerProvider)
 * - Keyboard navigation support
 * - ARIA attributes
 * - Focus management
 * - Live region updates
 * - High contrast support
 *
 * This example shows how to build an inclusive Kanban board
 * that works for users with assistive technologies.
 */

import { useState, useCallback } from 'react';
import {
  KanbanBoard,
  applyDragResult,
  AnnouncerProvider,
  useAnnouncer,
  announcements,
  type KanbanBoardState,
  type DropResult,
} from 'react-dragdrop-kit/kanban';

function AccessibleKanbanInner() {
  const { announce } = useAnnouncer();

  const [state, setState] = useState<KanbanBoardState>({
    columns: [
      { id: 'backlog', title: 'Backlog', cardIds: ['task-1', 'task-2'] },
      { id: 'todo', title: 'To Do', cardIds: ['task-3', 'task-4'] },
      { id: 'in-progress', title: 'In Progress', cardIds: ['task-5'] },
      { id: 'review', title: 'Review', cardIds: [] },
      { id: 'done', title: 'Done', cardIds: ['task-6'] },
    ],
    cards: {
      'task-1': { id: 'task-1', title: 'Setup accessibility testing tools' },
      'task-2': { id: 'task-2', title: 'Audit current components' },
      'task-3': { id: 'task-3', title: 'Add ARIA labels to forms' },
      'task-4': { id: 'task-4', title: 'Implement keyboard navigation' },
      'task-5': { id: 'task-5', title: 'Test with screen readers' },
      'task-6': { id: 'task-6', title: 'Document accessibility features' },
    },
  });

  const [showInstructions, setShowInstructions] = useState(true);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      // Handle drag cancellation
      if (!result.destination) {
        if (result.type === 'CARD') {
          const card = state.cards[result.draggableId];
          const sourceColumn = state.columns.find((col) =>
            col.cardIds.includes(result.draggableId)
          );
          announce(announcements.onDragCancel(card?.title || 'Card', sourceColumn?.title || 'column'));
        } else {
          const column = state.columns.find((col) => col.id === result.draggableId);
          announce(announcements.onDragCancel(column?.title || 'Column', 'board'));
        }
        return;
      }

      // Apply the drag result
      const newState = applyDragResult(state, result);
      setState(newState);

      // Announce the result
      if (result.type === 'CARD') {
        const card = state.cards[result.draggableId];
        const sourceColumn = state.columns.find((col) =>
          col.cardIds.includes(result.draggableId)
        );
        const destColumn = newState.columns.find(
          (col) => col.id === result.destination!.columnId
        );

        announce(
          announcements.onDragEnd(
            card?.title || 'Card',
            sourceColumn?.title || 'column',
            destColumn?.title || 'column',
            result.destination.index
          )
        );
      } else {
        const column = state.columns.find((col) => col.id === result.draggableId);
        announce(
          announcements.onColumnMove(
            column?.title || 'Column',
            result.destination.index,
            state.columns.length
          )
        );
      }
    },
    [state, announce]
  );

  const handleDragStart = useCallback(
    (draggable: { id: string; type: 'CARD' | 'COLUMN' }) => {
      if (draggable.type === 'CARD') {
        const card = state.cards[draggable.id];
        const sourceColumn = state.columns.find((col) =>
          col.cardIds.includes(draggable.id)
        );
        const position = sourceColumn?.cardIds.indexOf(draggable.id) ?? 0;
        const totalItems = sourceColumn?.cardIds.length ?? 0;
        announce(announcements.onDragStart(card?.title || 'Card', position, totalItems));
      }
    },
    [state, announce]
  );

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Header with Instructions */}
      <div
        style={{
          backgroundColor: '#f0f9ff',
          border: '2px solid #0ea5e9',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: '0 0 8px 0', color: '#0c4a6e', fontSize: '24px' }}>
              ♿ Accessible Kanban Board
            </h1>
            <p style={{ margin: '0 0 12px 0', color: '#075985', fontSize: '14px' }}>
              Fully accessible with screen reader support and keyboard navigation
            </p>

            {showInstructions && (
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  lineHeight: '1.6',
                }}
                role="region"
                aria-label="Accessibility instructions"
              >
                <strong style={{ display: 'block', marginBottom: '8px' }}>
                  🎯 Accessibility Features:
                </strong>
                <ul style={{ margin: '0', paddingLeft: '20px' }}>
                  <li>
                    <strong>Screen Readers:</strong> All drag operations are announced with
                    context-aware messages
                  </li>
                  <li>
                    <strong>Keyboard:</strong> Use Tab to navigate, Space to grab/drop items
                  </li>
                  <li>
                    <strong>ARIA:</strong> Proper roles, labels, and live regions for assistive
                    tech
                  </li>
                  <li>
                    <strong>Focus:</strong> Clear focus indicators and logical tab order
                  </li>
                  <li>
                    <strong>High Contrast:</strong> Works with high contrast mode settings
                  </li>
                </ul>
                <p style={{ margin: '12px 0 0 0', fontStyle: 'italic', color: '#64748b' }}>
                  💡 Tip: Try dragging with a screen reader enabled to hear the announcements!
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowInstructions(!showInstructions)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #0ea5e9',
              backgroundColor: '#fff',
              color: '#0369a1',
              cursor: 'pointer',
              fontSize: '12px',
              marginLeft: '16px',
            }}
            aria-label={showInstructions ? 'Hide instructions' : 'Show instructions'}
          >
            {showInstructions ? 'Hide' : 'Show'} Instructions
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        state={state}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        style={{
          display: 'flex',
          gap: '16px',
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
        renderColumn={(column, provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef as any}
            style={{
              backgroundColor: snapshot.isDragging ? '#e0f2fe' : '#fff',
              borderRadius: '8px',
              padding: '12px',
              minWidth: '260px',
              maxWidth: '260px',
              border: snapshot.isDragging ? '2px solid #0ea5e9' : '2px solid #e5e7eb',
              boxShadow: snapshot.isDragging
                ? '0 8px 16px rgba(0,0,0,0.15)'
                : '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
              outline: 'none',
            }}
            role="group"
            aria-label={`${column.title} column with ${column.cardIds.length} cards`}
          >
            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#0ea5e9',
                }}
                aria-hidden="true"
              />
              {column.title}
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '12px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: '#f1f5f9',
                  color: '#64748b',
                }}
                aria-label={`${column.cardIds.length} cards`}
              >
                {column.cardIds.length}
              </span>
            </h3>

            {column.cardIds.length === 0 && (
              <div
                style={{
                  padding: '24px 12px',
                  textAlign: 'center',
                  color: '#94a3b8',
                  fontSize: '13px',
                  fontStyle: 'italic',
                  border: '2px dashed #e2e8f0',
                  borderRadius: '6px',
                }}
                role="status"
                aria-label="Empty column"
              >
                Drop cards here
              </div>
            )}
          </div>
        )}
        renderCard={(card, provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef as any}
            style={{
              backgroundColor: snapshot.isDragging ? '#fff' : '#fff',
              borderRadius: '6px',
              padding: '12px',
              marginBottom: '8px',
              border: snapshot.isDragging ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
              boxShadow: snapshot.isDragging
                ? '0 8px 16px rgba(0,0,0,0.2)'
                : '0 1px 3px rgba(0,0,0,0.1)',
              cursor: 'grab',
              transition: 'all 0.2s',
              outline: 'none',
            }}
            role="article"
            aria-label={card.title}
            tabIndex={0}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1e293b',
                lineHeight: '1.4',
              }}
            >
              {card.title}
            </div>
          </div>
        )}
      />

      {/* Accessibility Stats */}
      <div
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          fontSize: '13px',
          color: '#475569',
        }}
        role="status"
        aria-live="polite"
      >
        <strong>Board Status:</strong> {state.columns.reduce((sum, col) => sum + col.cardIds.length, 0)}{' '}
        total tasks across {state.columns.length} columns |{' '}
        <span style={{ color: '#0ea5e9' }}>✓ Screen reader enabled</span> |{' '}
        <span style={{ color: '#10b981' }}>✓ Keyboard accessible</span>
      </div>
    </div>
  );
}

export default function AccessibleKanbanExample() {
  return (
    <AnnouncerProvider>
      <AccessibleKanbanInner />
    </AnnouncerProvider>
  );
}
