/**
 * Basic Kanban Example
 *
 * A minimal example showing the core functionality of the Kanban board.
 * Perfect for getting started quickly.
 */

import { useState } from 'react';
import {
  KanbanBoard,
  applyDragResult,
  AnnouncerProvider,
  type KanbanBoardState,
  type DropResult,
} from 'react-dragdrop-kit/kanban';

export default function BasicKanbanExample() {
  const [state, setState] = useState<KanbanBoardState>({
    columns: [
      { id: 'todo', title: 'To Do', cardIds: ['task-1', 'task-2', 'task-3'] },
      { id: 'in-progress', title: 'In Progress', cardIds: ['task-4'] },
      { id: 'done', title: 'Done', cardIds: ['task-5'] },
    ],
    cards: {
      'task-1': { id: 'task-1', title: 'Design landing page' },
      'task-2': { id: 'task-2', title: 'Implement authentication' },
      'task-3': { id: 'task-3', title: 'Create user dashboard' },
      'task-4': { id: 'task-4', title: 'Setup CI/CD pipeline' },
      'task-5': { id: 'task-5', title: 'Write documentation' },
    },
  });

  const handleDragEnd = (result: DropResult) => {
    // Cancel if dropped outside
    if (!result.destination) return;

    // Apply the drag result to get new state
    const newState = applyDragResult(state, result);
    setState(newState);
  };

  return (
    <AnnouncerProvider>
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Basic Kanban Board</h1>

        <KanbanBoard
          state={state}
          onDragEnd={handleDragEnd}
          style={{
            display: 'flex',
            gap: '16px',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
          renderColumn={(column) => (
            <div
              style={{
                backgroundColor: '#e5e7eb',
                borderRadius: '8px',
                padding: '12px',
                minWidth: '280px',
                maxWidth: '280px',
              }}
            >
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
                {column.title}
              </h3>
            </div>
          )}
          renderCard={(card) => (
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '6px',
                padding: '12px',
                marginBottom: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'grab',
              }}
            >
              {card.title}
            </div>
          )}
        />
      </div>
    </AnnouncerProvider>
  );
}
