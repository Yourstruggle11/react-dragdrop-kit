import { useCallback, useMemo, useState } from "react";
import {
  KanbanBoard,
  applyDragResult,
  type DropResult,
  type KanbanBoardState,
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
import { useDebouncedToast } from "@/hooks/useDebouncedToast";
import toast from "react-hot-toast";

interface WipColumn extends KanbanColumn {
  wipLimit: number;
}

const initialState: KanbanBoardState = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      wipLimit: 8,
      cardIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    {
      id: "in-progress",
      title: "In Progress",
      wipLimit: 3,
      cardIds: ["task-5", "task-6"],
    },
    {
      id: "review",
      title: "Review",
      wipLimit: 2,
      cardIds: ["task-7"],
    },
    {
      id: "done",
      title: "Done",
      wipLimit: 99,
      cardIds: ["task-8"],
    },
  ] as WipColumn[],
  cards: {
    "task-1": { id: "task-1", title: "Audit keyboard interactions" },
    "task-2": { id: "task-2", title: "Benchmark drag latency" },
    "task-3": { id: "task-3", title: "Add list multi-drag docs" },
    "task-4": { id: "task-4", title: "Improve empty-state visuals" },
    "task-5": { id: "task-5", title: "Fix boundary destination math" },
    "task-6": { id: "task-6", title: "Refine kanban dnd tests" },
    "task-7": { id: "task-7", title: "Review release checklist" },
    "task-8": { id: "task-8", title: "Deploy demo site" },
  },
};

function limitColor(usage: number): string {
  if (usage >= 1) return colors.error[500];
  if (usage >= 0.8) return colors.warning[500];
  return colors.success[500];
}

export default function WipLimitsKanbanExample() {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const [state, setState] = useState<KanbanBoardState>(initialState);
  const { showToast } = useDebouncedToast();

  const blockedColumns = useMemo(() => {
    return state.columns
      .map((column) => {
        const typedColumn = column as WipColumn;
        return {
          id: typedColumn.id,
          blocked:
            typedColumn.wipLimit !== 99 && typedColumn.cardIds.length >= typedColumn.wipLimit,
        };
      })
      .filter((column) => column.blocked).length;
  }, [state.columns]);

  const handleDragEnd = useCallback(
    (result: DropResult, stateBefore: KanbanBoardState) => {
      if (!result.destination) return;

      if (result.type === "CARD") {
        const sourceColumnId = result.source.columnId;
        const destinationColumnId = result.destination.columnId;

        if (
          sourceColumnId &&
          destinationColumnId &&
          sourceColumnId !== destinationColumnId
        ) {
          const destinationColumn = stateBefore.columns.find(
            (column) => column.id === destinationColumnId
          ) as WipColumn | undefined;
          if (
            destinationColumn &&
            destinationColumn.wipLimit !== 99 &&
            destinationColumn.cardIds.length >= destinationColumn.wipLimit
          ) {
            toast.error(
              `${destinationColumn.title} reached its WIP limit (${destinationColumn.wipLimit})`
            );
            return;
          }
        }
      }

      const nextState = applyDragResult(stateBefore, result);
      setState(nextState);
      showToast(result.type === "CARD" ? "Card moved" : "Column reordered");
    },
    [showToast]
  );

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
          WIP Limits Kanban
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: spacing.md,
            color: isDark ? colors.gray[400] : colors.gray[600],
          }}
        >
          Column limits prevent overloading work in progress.
        </p>
        <div
          style={{
            marginBottom: spacing.lg,
            fontSize: typography.fontSize.sm,
            color: isDark ? colors.gray[300] : colors.gray[700],
          }}
        >
          {blockedColumns} constrained column{blockedColumns === 1 ? "" : "s"} at limit
        </div>

        <KanbanBoard
          state={state}
          onDragEnd={handleDragEnd}
          style={{ display: "flex", gap: "14px", overflowX: "auto", alignItems: "flex-start" }}
          renderColumn={(column) => {
            const typedColumn = column as WipColumn;
            const cardCount = typedColumn.cardIds.length;
            const usage =
              typedColumn.wipLimit === 99 ? 0 : cardCount / typedColumn.wipLimit;
            const usageColor = limitColor(usage);
            const hardLimitReached =
              typedColumn.wipLimit !== 99 && cardCount >= typedColumn.wipLimit;

            return (
              <div
                style={{
                  minWidth: "300px",
                  borderRadius: borderRadius.lg,
                  border: `1px solid ${hardLimitReached ? usageColor : isDark ? colors.gray[700] : colors.gray[200]}`,
                  background: isDark ? colors.gray[800] : colors.gray[100],
                  padding: spacing.md,
                  boxShadow: shadows.sm,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: spacing.sm,
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
                      color: usageColor,
                      fontWeight: typography.fontWeight.semibold,
                      fontSize: typography.fontSize.sm,
                    }}
                  >
                    {typedColumn.wipLimit === 99
                      ? `${cardCount}`
                      : `${cardCount}/${typedColumn.wipLimit}`}
                  </span>
                </div>
                {typedColumn.wipLimit !== 99 && (
                  <div
                    style={{
                      height: "6px",
                      borderRadius: borderRadius.full,
                      background: isDark ? colors.gray[700] : colors.gray[200],
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(100, usage * 100)}%`,
                        height: "100%",
                        background: usageColor,
                        transition: "width 160ms ease",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          }}
          renderCard={(card) => (
            <div
              style={{
                borderRadius: borderRadius.md,
                border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
                background: isDark ? colors.gray[800] : colors.white,
                padding: spacing.sm,
              }}
            >
              <span
                style={{
                  color: isDark ? colors.gray[100] : colors.gray[900],
                  fontSize: typography.fontSize.sm,
                }}
              >
                {card.title}
              </span>
            </div>
          )}
        />
      </div>
    </div>
  );
}
