import { useCallback, useMemo, useState } from "react";
import {
  KanbanBoard,
  applyDragResult,
  type DropResult,
  type KanbanBoardState,
  type KanbanCard,
} from "react-dragdrop-kit/kanban";
import { useThemeMode } from "@/contexts/useThemeMode";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/constants/designSystem";
import { useDebouncedToast } from "@/hooks/useDebouncedToast";

interface BasicCard extends KanbanCard {
  estimate: string;
}

const initialState: KanbanBoardState = {
  columns: [
    { id: "todo", title: "To Do", cardIds: ["task-1", "task-2", "task-3"] },
    { id: "in-progress", title: "In Progress", cardIds: ["task-4"] },
    { id: "done", title: "Done", cardIds: ["task-5"] },
  ],
  cards: {
    "task-1": { id: "task-1", title: "Prepare sprint goals", estimate: "1d" },
    "task-2": { id: "task-2", title: "Design reusable list cards", estimate: "2d" },
    "task-3": { id: "task-3", title: "Write drag-drop docs", estimate: "0.5d" },
    "task-4": { id: "task-4", title: "Implement demo examples", estimate: "2d" },
    "task-5": { id: "task-5", title: "Ship v1.2.0 release notes", estimate: "0.5d" },
  } as Record<string, BasicCard>,
};

export default function BasicKanbanExample() {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const [state, setState] = useState<KanbanBoardState>(initialState);
  const { showToast } = useDebouncedToast();

  const totalCards = useMemo(
    () =>
      state.columns.reduce((sum, column) => {
        return sum + column.cardIds.length;
      }, 0),
    [state.columns]
  );

  const handleDragEnd = useCallback(
    (result: DropResult, stateBefore: KanbanBoardState) => {
      if (!result.destination) return;
      const next = applyDragResult(stateBefore, result);
      setState(next);
      showToast(result.type === "CARD" ? "Card moved" : "Column reordered");
    },
    [showToast]
  );

  return (
    <div style={{ padding: spacing.xl }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <h2
          style={{
            margin: 0,
            marginBottom: spacing.sm,
            color: isDark ? colors.white : colors.gray[900],
            fontSize: typography.fontSize["2xl"],
            fontWeight: typography.fontWeight.bold,
          }}
        >
          Basic Kanban Board
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: spacing.md,
            color: isDark ? colors.gray[400] : colors.gray[600],
          }}
        >
          Drag cards between columns or reorder whole columns by dragging headers.
        </p>
        <div
          style={{
            marginBottom: spacing.lg,
            color: isDark ? colors.gray[300] : colors.gray[700],
            fontSize: typography.fontSize.sm,
          }}
        >
          {state.columns.length} columns, {totalCards} cards
        </div>

        <KanbanBoard
          state={state}
          onDragEnd={handleDragEnd}
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
            overflowX: "auto",
          }}
          renderColumn={(column) => (
            <div
              style={{
                padding: spacing.md,
                borderRadius: borderRadius.lg,
                background: isDark ? colors.gray[800] : colors.gray[100],
                border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
                minWidth: "280px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: isDark ? colors.gray[100] : colors.gray[900],
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                  }}
                >
                  {column.title}
                </h3>
                <span
                  style={{
                    padding: `2px ${spacing.sm}`,
                    borderRadius: borderRadius.full,
                    background: isDark ? colors.gray[700] : colors.white,
                    color: isDark ? colors.gray[200] : colors.gray[700],
                    fontSize: typography.fontSize.xs,
                  }}
                >
                  {column.cardIds.length}
                </span>
              </div>
            </div>
          )}
          renderCard={(card) => {
            const typedCard = card as BasicCard;
            return (
              <div
                style={{
                  padding: spacing.md,
                  borderRadius: borderRadius.md,
                  background: isDark ? colors.gray[800] : colors.white,
                  border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
                  boxShadow: shadows.sm,
                }}
              >
                <div
                  style={{
                    color: isDark ? colors.gray[100] : colors.gray[900],
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.semibold,
                    marginBottom: spacing.xs,
                  }}
                >
                  {typedCard.title}
                </div>
                <div
                  style={{
                    color: isDark ? colors.gray[400] : colors.gray[600],
                    fontSize: typography.fontSize.xs,
                  }}
                >
                  Estimate: {typedCard.estimate}
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
