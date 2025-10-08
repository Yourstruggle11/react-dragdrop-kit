/**
 * Rich Cards Kanban Example
 *
 * Shows how to create rich, detailed cards with:
 * - Priority badges
 * - Assignee avatars
 * - Tags/labels
 * - Due dates
 * - Card descriptions
 */

import { useState } from 'react';
import {
  KanbanBoard,
  applyDragResult,
  AnnouncerProvider,
  type KanbanBoardState,
  type DropResult,
  type KanbanCard,
  type KanbanColumn,
} from 'react-dragdrop-kit/kanban';

// Extended card type with rich metadata
interface RichCard extends KanbanCard {
  priority: 'low' | 'medium' | 'high';
  assignee: {
    name: string;
    avatar: string;
    color: string;
  };
  tags: string[];
  dueDate?: string;
  description?: string;
}

// Extended column type
interface RichColumn extends KanbanColumn {
  color: string;
  limit?: number;
}

export default function RichCardsKanbanExample() {
  const [state, setState] = useState<KanbanBoardState>({
    columns: [
      { id: 'backlog', title: 'Backlog', color: '#94a3b8', cardIds: ['task-1', 'task-2'] },
      { id: 'todo', title: 'To Do', color: '#60a5fa', limit: 5, cardIds: ['task-3', 'task-4'] },
      { id: 'in-progress', title: 'In Progress', color: '#fbbf24', limit: 3, cardIds: ['task-5'] },
      { id: 'review', title: 'Review', color: '#a78bfa', cardIds: ['task-6'] },
      { id: 'done', title: 'Done', color: '#34d399', cardIds: ['task-7'] },
    ] as RichColumn[],
    cards: {
      'task-1': {
        id: 'task-1',
        title: 'Design new dashboard layout',
        priority: 'high',
        assignee: { name: 'Alice', avatar: 'A', color: '#ef4444' },
        tags: ['design', 'ui'],
        dueDate: '2025-10-15',
        description: 'Create wireframes and mockups for the new dashboard',
      },
      'task-2': {
        id: 'task-2',
        title: 'Research competitor features',
        priority: 'medium',
        assignee: { name: 'Bob', avatar: 'B', color: '#3b82f6' },
        tags: ['research'],
        dueDate: '2025-10-12',
      },
      'task-3': {
        id: 'task-3',
        title: 'Implement user authentication',
        priority: 'high',
        assignee: { name: 'Charlie', avatar: 'C', color: '#8b5cf6' },
        tags: ['backend', 'security'],
        dueDate: '2025-10-18',
      },
      'task-4': {
        id: 'task-4',
        title: 'Write API documentation',
        priority: 'low',
        assignee: { name: 'Diana', avatar: 'D', color: '#10b981' },
        tags: ['docs'],
      },
      'task-5': {
        id: 'task-5',
        title: 'Build payment integration',
        priority: 'high',
        assignee: { name: 'Alice', avatar: 'A', color: '#ef4444' },
        tags: ['backend', 'payment'],
        dueDate: '2025-10-20',
      },
      'task-6': {
        id: 'task-6',
        title: 'Code review: User profile',
        priority: 'medium',
        assignee: { name: 'Bob', avatar: 'B', color: '#3b82f6' },
        tags: ['review', 'frontend'],
      },
      'task-7': {
        id: 'task-7',
        title: 'Setup CI/CD pipeline',
        priority: 'medium',
        assignee: { name: 'Charlie', avatar: 'C', color: '#8b5cf6' },
        tags: ['devops', 'automation'],
      },
    } as Record<string, RichCard>,
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newState = applyDragResult(state, result);
    setState(newState);
  };

  const getPriorityColor = (priority: RichCard['priority']) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <AnnouncerProvider>
      <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ marginBottom: '10px' }}>Project Management Board</h1>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>
          Rich cards with priority, assignees, tags, and due dates
        </p>

        <KanbanBoard
          state={state}
          onDragEnd={handleDragEnd}
          style={{
            display: 'flex',
            gap: '16px',
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            overflowX: 'auto',
          }}
          renderColumn={(column) => {
            const col = column as RichColumn;
            const cardCount = col.cardIds.length;

            return (
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '12px',
                  minWidth: '320px',
                  maxWidth: '320px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '2px solid transparent',
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: col.color,
                      }}
                    />
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', flex: 1 }}>
                      {col.title}
                    </h3>
                    <span
                      style={{
                        fontSize: '12px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        backgroundColor: '#f1f5f9',
                        color: '#64748b',
                        fontWeight: '500',
                      }}
                    >
                      {cardCount}
                    </span>
                  </div>
                  {col.limit && (
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '20px' }}>
                      Limit: {cardCount}/{col.limit}
                    </div>
                  )}
                </div>
              </div>
            );
          }}
          renderCard={(card) => {
            const richCard = card as RichCard;

            return (
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  cursor: 'grab',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Priority badge */}
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: `${getPriorityColor(richCard.priority)}20`,
                    color: getPriorityColor(richCard.priority),
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  {richCard.priority}
                </div>

                {/* Title */}
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  {richCard.title}
                </h4>

                {/* Description */}
                {richCard.description && (
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                    {richCard.description}
                  </p>
                )}

                {/* Tags */}
                {richCard.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {richCard.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer: Assignee and Due Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  {/* Assignee */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: richCard.assignee.color,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}
                    >
                      {richCard.assignee.avatar}
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      {richCard.assignee.name}
                    </span>
                  </div>

                  {/* Due Date */}
                  {richCard.dueDate && (
                    <div
                      style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                      }}
                    >
                      📅 {formatDate(richCard.dueDate)}
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        />
      </div>
    </AnnouncerProvider>
  );
}
