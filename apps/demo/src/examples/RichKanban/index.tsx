import { useCallback, useMemo, useState } from "react";
import {
  KanbanBoard,
  applyDragResult,
  type DropResult,
  type KanbanBoardState,
  type KanbanCard,
  type KanbanColumn,
} from "react-dragdrop-kit/kanban";
import { useThemeMode } from "@/contexts/useThemeMode";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/constants/designSystem";

interface RichCard extends KanbanCard {
  priority: "low" | "medium" | "high";
  assignee: string;
  tags: string[];
  storyPoints: number;
  dueDate?: string;
}

interface RichColumn extends KanbanColumn {
  accent: string;
}

const initialState: KanbanBoardState = {
  columns: [
    {
      id: "backlog",
      title: "Backlog",
      accent: colors.gray[400],
      cardIds: ["task-1", "task-2"],
    },
    {
      id: "todo",
      title: "Ready",
      accent: colors.info[500],
      cardIds: ["task-3", "task-4"],
    },
    {
      id: "building",
      title: "Building",
      accent: colors.warning[500],
      cardIds: ["task-5"],
    },
    {
      id: "review",
      title: "Review",
      accent: colors.purple[500],
      cardIds: ["task-6"],
    },
    {
      id: "done",
      title: "Done",
      accent: colors.success[500],
      cardIds: ["task-7"],
    },
  ] as RichColumn[],
  cards: {
    "task-1": {
      id: "task-1",
      title: "Refactor list monitor lifecycle",
      priority: "high",
      assignee: "Riya",
      tags: ["core", "stability"],
      storyPoints: 5,
      dueDate: "2026-02-18",
    },
    "task-2": {
      id: "task-2",
      title: "Add drag-handle docs",
      priority: "medium",
      assignee: "Noah",
      tags: ["docs"],
      storyPoints: 2,
    },
    "task-3": {
      id: "task-3",
      title: "Ship drop-indicator example",
      priority: "high",
      assignee: "Mia",
      tags: ["demo", "ux"],
      storyPoints: 3,
      dueDate: "2026-02-16",
    },
    "task-4": {
      id: "task-4",
      title: "Close stale lint warnings",
      priority: "low",
      assignee: "Liam",
      tags: ["tooling"],
      storyPoints: 1,
    },
    "task-5": {
      id: "task-5",
      title: "Implement Kanban examples",
      priority: "high",
      assignee: "Ava",
      tags: ["kanban", "demo"],
      storyPoints: 8,
      dueDate: "2026-02-19",
    },
    "task-6": {
      id: "task-6",
      title: "Review release notes v1.2.0",
      priority: "medium",
      assignee: "Kai",
      tags: ["release"],
      storyPoints: 2,
    },
    "task-7": {
      id: "task-7",
      title: "Merge docs + test updates",
      priority: "medium",
      assignee: "Sana",
      tags: ["docs", "tests"],
      storyPoints: 3,
    },
  } as Record<string, RichCard>,
};

function priorityColor(priority: RichCard["priority"]): string {
  switch (priority) {
    case "high":
      return colors.error[500];
    case "medium":
      return colors.warning[500];
    case "low":
      return colors.success[500];
    default:
      return colors.gray[500];
  }
}

export default function RichKanbanExample() {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const [state, setState] = useState<KanbanBoardState>(initialState);

  const totalStoryPoints = useMemo(() => {
    return Object.values(state.cards).reduce((sum, card) => {
      const typedCard = card as RichCard;
      return sum + typedCard.storyPoints;
    }, 0);
  }, [state.cards]);

  const handleDragEnd = useCallback((result: DropResult, stateBefore: KanbanBoardState) => {
    if (!result.destination) return;
    setState(applyDragResult(stateBefore, result));
  }, []);

  return (
    <div style={{ padding: spacing.xl }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h2
          style={{
            margin: 0,
            marginBottom: spacing.sm,
            color: isDark ? colors.white : colors.gray[900],
            fontSize: typography.fontSize["2xl"],
            fontWeight: typography.fontWeight.bold,
          }}
        >
          Rich Kanban
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: spacing.md,
            color: isDark ? colors.gray[400] : colors.gray[600],
          }}
        >
          Cards include priority, assignee, tags, due date, and story points.
        </p>
        <div
          style={{
            marginBottom: spacing.lg,
            color: isDark ? colors.gray[300] : colors.gray[700],
            fontSize: typography.fontSize.sm,
          }}
        >
          {state.columns.length} columns | {Object.keys(state.cards).length} cards |{" "}
          {totalStoryPoints} story points
        </div>

        <KanbanBoard
          state={state}
          onDragEnd={handleDragEnd}
          style={{ display: "flex", gap: "16px", overflowX: "auto", alignItems: "flex-start" }}
          renderColumn={(column) => {
            const typedColumn = column as RichColumn;
            return (
              <div
                style={{
                  minWidth: "320px",
                  background: isDark ? colors.gray[800] : colors.gray[100],
                  border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
                  borderRadius: borderRadius.lg,
                  padding: spacing.md,
                  boxShadow: shadows.sm,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `2px solid ${typedColumn.accent}`,
                    paddingBottom: spacing.sm,
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
                    {typedColumn.title}
                  </h3>
                  <span
                    style={{
                      padding: `2px ${spacing.sm}`,
                      borderRadius: borderRadius.full,
                      background: `${typedColumn.accent}22`,
                      color: typedColumn.accent,
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                    }}
                  >
                    {typedColumn.cardIds.length}
                  </span>
                </div>
              </div>
            );
          }}
          renderCard={(card) => {
            const typedCard = card as RichCard;
            const cardPriorityColor = priorityColor(typedCard.priority);
            return (
              <div
                style={{
                  borderRadius: borderRadius.md,
                  padding: spacing.md,
                  border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
                  background: isDark ? colors.gray[800] : colors.white,
                  boxShadow: shadows.sm,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: spacing.xs,
                  }}
                >
                  <span
                    style={{
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                      color: cardPriorityColor,
                      background: `${cardPriorityColor}22`,
                      padding: `2px ${spacing.sm}`,
                      borderRadius: borderRadius.full,
                      textTransform: "uppercase",
                    }}
                  >
                    {typedCard.priority}
                  </span>
                  <span
                    style={{
                      fontSize: typography.fontSize.xs,
                      color: isDark ? colors.gray[400] : colors.gray[600],
                    }}
                  >
                    {typedCard.storyPoints} pts
                  </span>
                </div>
                <div
                  style={{
                    fontWeight: typography.fontWeight.semibold,
                    color: isDark ? colors.gray[50] : colors.gray[900],
                    fontSize: typography.fontSize.sm,
                    marginBottom: spacing.xs,
                  }}
                >
                  {typedCard.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: isDark ? colors.gray[400] : colors.gray[600],
                    fontSize: typography.fontSize.xs,
                    marginBottom: spacing.sm,
                  }}
                >
                  <span>@{typedCard.assignee}</span>
                  <span>{typedCard.dueDate ?? "No due date"}</span>
                </div>
                <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
                  {typedCard.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: isDark ? colors.gray[700] : colors.gray[100],
                        color: isDark ? colors.gray[300] : colors.gray[700],
                        fontSize: typography.fontSize.xs,
                        padding: `2px ${spacing.sm}`,
                        borderRadius: borderRadius.full,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
