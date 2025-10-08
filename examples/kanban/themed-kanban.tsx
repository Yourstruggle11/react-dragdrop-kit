/**
 * Themed Kanban Example
 *
 * Demonstrates how to create multiple visual themes for your Kanban board:
 * - Modern (default)
 * - Dark mode
 * - Minimal
 * - Colorful
 *
 * Shows theme switching and CSS-in-JS styling patterns.
 */

import { useState } from 'react';
import {
  KanbanBoard,
  applyDragResult,
  AnnouncerProvider,
  type KanbanBoardState,
  type DropResult,
} from 'react-dragdrop-kit/kanban';

type Theme = 'modern' | 'dark' | 'minimal' | 'colorful';

interface ThemeConfig {
  name: string;
  background: string;
  cardBg: string;
  cardBorder: string;
  cardText: string;
  columnBg: string;
  columnText: string;
  headerBg: string;
  headerText: string;
  shadow: string;
}

const themes: Record<Theme, ThemeConfig> = {
  modern: {
    name: 'Modern',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBg: '#ffffff',
    cardBorder: '#e5e7eb',
    cardText: '#1f2937',
    columnBg: 'rgba(255, 255, 255, 0.95)',
    columnText: '#374151',
    headerBg: '#f9fafb',
    headerText: '#111827',
    shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  dark: {
    name: 'Dark',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    cardBg: '#334155',
    cardBorder: '#475569',
    cardText: '#f1f5f9',
    columnBg: '#1e293b',
    columnText: '#e2e8f0',
    headerBg: '#0f172a',
    headerText: '#f8fafc',
    shadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  minimal: {
    name: 'Minimal',
    background: '#ffffff',
    cardBg: '#ffffff',
    cardBorder: '#d1d5db',
    cardText: '#374151',
    columnBg: '#f9fafb',
    columnText: '#1f2937',
    headerBg: '#ffffff',
    headerText: '#111827',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  colorful: {
    name: 'Colorful',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    cardBg: '#ffffff',
    cardBorder: 'transparent',
    cardText: '#1f2937',
    columnBg: 'rgba(255, 255, 255, 0.9)',
    columnText: '#374151',
    headerBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    headerText: '#ffffff',
    shadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
};

export default function ThemedKanbanExample() {
  const [theme, setTheme] = useState<Theme>('modern');
  const [state, setState] = useState<KanbanBoardState>({
    columns: [
      { id: 'ideas', title: '💡 Ideas', cardIds: ['task-1', 'task-2'] },
      { id: 'todo', title: '📋 To Do', cardIds: ['task-3'] },
      { id: 'doing', title: '🚀 Doing', cardIds: ['task-4'] },
      { id: 'done', title: '✅ Done', cardIds: ['task-5'] },
    ],
    cards: {
      'task-1': { id: 'task-1', title: 'Brainstorm new features' },
      'task-2': { id: 'task-2', title: 'User feedback analysis' },
      'task-3': { id: 'task-3', title: 'Design mockups' },
      'task-4': { id: 'task-4', title: 'Implement login flow' },
      'task-5': { id: 'task-5', title: 'Setup deployment' },
    },
  });

  const currentTheme = themes[theme];

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newState = applyDragResult(state, result);
    setState(newState);
  };

  return (
    <AnnouncerProvider>
      <div
        style={{
          minHeight: '100vh',
          background: currentTheme.background,
          padding: '20px',
          fontFamily: 'system-ui, sans-serif',
          transition: 'background 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: currentTheme.headerBg,
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: currentTheme.shadow,
          }}
        >
          <h1
            style={{
              margin: '0 0 16px 0',
              color: currentTheme.headerText,
              fontSize: '28px',
            }}
          >
            Themed Kanban Board
          </h1>

          {/* Theme Switcher */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(Object.keys(themes) as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: theme === t ? '2px solid #667eea' : '1px solid #d1d5db',
                  backgroundColor: theme === t ? '#667eea' : '#fff',
                  color: theme === t ? '#fff' : '#374151',
                  cursor: 'pointer',
                  fontWeight: theme === t ? '600' : '400',
                  transition: 'all 0.2s',
                }}
              >
                {themes[t].name}
              </button>
            ))}
          </div>
        </div>

        {/* Kanban Board */}
        <KanbanBoard
          state={state}
          onDragEnd={handleDragEnd}
          style={{
            display: 'flex',
            gap: '16px',
            padding: '20px',
            backgroundColor: 'transparent',
            borderRadius: '12px',
            overflowX: 'auto',
          }}
          renderColumn={(column) => (
            <div
              style={{
                backgroundColor: currentTheme.columnBg,
                borderRadius: '12px',
                padding: '16px',
                minWidth: '280px',
                maxWidth: '280px',
                boxShadow: currentTheme.shadow,
                transition: 'all 0.3s ease',
              }}
            >
              <h3
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: currentTheme.columnText,
                }}
              >
                {column.title}
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '12px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor:
                      theme === 'dark' ? '#475569' : 'rgba(0, 0, 0, 0.05)',
                    color: currentTheme.columnText,
                    fontWeight: '500',
                  }}
                >
                  {column.cardIds.length}
                </span>
              </h3>
            </div>
          )}
          renderCard={(card) => (
            <div
              style={{
                backgroundColor: currentTheme.cardBg,
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '8px',
                border: `1px solid ${currentTheme.cardBorder}`,
                boxShadow: currentTheme.shadow,
                cursor: 'grab',
                color: currentTheme.cardText,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = currentTheme.shadow;
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{card.title}</div>
            </div>
          )}
        />

        {/* Theme Info */}
        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            background: currentTheme.headerBg,
            borderRadius: '8px',
            boxShadow: currentTheme.shadow,
            color: currentTheme.headerText,
            fontSize: '14px',
          }}
        >
          <strong>Current Theme:</strong> {currentTheme.name} | Try dragging cards and columns!
          The theme persists across all interactions.
        </div>
      </div>
    </AnnouncerProvider>
  );
}
