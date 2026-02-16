import { useCallback, useMemo, useState } from "react";
import {
  KanbanBoard,
  applyDragResult,
  type DropResult,
  type KanbanBoardState,
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

interface Swimlane {
  id: string;
  title: string;
  owner: string;
  state: KanbanBoardState;
}

const laneColumns = [
  { id: "todo", title: "To Do", cardIds: [] as string[] },
  { id: "in-progress", title: "In Progress", cardIds: [] as string[] },
  { id: "done", title: "Done", cardIds: [] as string[] },
];

const initialLanes: Swimlane[] = [
  {
    id: "lane-design",
    title: "Design Lane",
    owner: "Design Team",
    state: {
      columns: [
        { ...laneColumns[0], cardIds: ["design-1", "design-2"] },
        { ...laneColumns[1], cardIds: ["design-3"] },
        { ...laneColumns[2], cardIds: [] },
      ],
      cards: {
        "design-1": { id: "design-1", title: "Review component spacing" },
        "design-2": { id: "design-2", title: "Create empty state illustrations" },
        "design-3": { id: "design-3", title: "Finalize sidebar icon set" },
      },
    },
  },
  {
    id: "lane-engineering",
    title: "Engineering Lane",
    owner: "Frontend Team",
    state: {
      columns: [
        { ...laneColumns[0], cardIds: ["eng-1", "eng-2"] },
        { ...laneColumns[1], cardIds: ["eng-3"] },
        { ...laneColumns[2], cardIds: ["eng-4"] },
      ],
      cards: {
        "eng-1": { id: "eng-1", title: "Add monitor lifecycle tests" },
        "eng-2": { id: "eng-2", title: "Implement drop-indicator demo" },
        "eng-3": { id: "eng-3", title: "Harden destination index math" },
        "eng-4": { id: "eng-4", title: "Publish release candidate" },
      },
    },
  },
];

export default function SwimlanesKanbanExample() {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const [lanes, setLanes] = useState<Swimlane[]>(initialLanes);
  const { showToast } = useDebouncedToast();

  const totalCards = useMemo(() => {
    return lanes.reduce((laneSum, lane) => {
      return (
        laneSum +
        lane.state.columns.reduce((columnSum, column) => columnSum + column.cardIds.length, 0)
      );
    }, 0);
  }, [lanes]);

  const handleLaneDragEnd = useCallback(
    (laneId: string, result: DropResult, stateBefore: KanbanBoardState) => {
      if (!result.destination) return;
      const nextLaneState = applyDragResult(stateBefore, result);
      setLanes((prev) =>
        prev.map((lane) =>
          lane.id === laneId
            ? {
                ...lane,
                state: nextLaneState,
              }
            : lane
        )
      );
      showToast(`${result.type === "CARD" ? "Card" : "Column"} moved in swimlane`);
    },
    [showToast]
  );

  return (
    <div style={{ padding: spacing.xl }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gap: spacing.lg }}>
        <div>
          <h2
            style={{
              margin: 0,
              marginBottom: spacing.sm,
              color: isDark ? colors.white : colors.gray[900],
              fontSize: typography.fontSize["2xl"],
              fontWeight: typography.fontWeight.bold,
            }}
          >
            Kanban with Swimlanes
          </h2>
          <p
            style={{
              margin: 0,
              color: isDark ? colors.gray[400] : colors.gray[600],
            }}
          >
            Separate workstreams rendered as independent lanes sharing the same board structure.
          </p>
          <div
            style={{
              marginTop: spacing.sm,
              color: isDark ? colors.gray[300] : colors.gray[700],
              fontSize: typography.fontSize.sm,
            }}
          >
            {lanes.length} swimlanes | {totalCards} total cards
          </div>
        </div>

        {lanes.map((lane) => (
          <section
            key={lane.id}
            style={{
              borderRadius: borderRadius.xl,
              border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
              background: isDark ? colors.gray[900] : colors.white,
              boxShadow: shadows.sm,
              padding: spacing.lg,
              display: "grid",
              gap: spacing.md,
            }}
          >
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    color: isDark ? colors.gray[100] : colors.gray[900],
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                  }}
                >
                  {lane.title}
                </h3>
                <div
                  style={{
                    marginTop: spacing.xs,
                    color: isDark ? colors.gray[400] : colors.gray[600],
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  Owner: {lane.owner}
                </div>
              </div>
              <span
                style={{
                  padding: `${spacing.xs} ${spacing.sm}`,
                  borderRadius: borderRadius.full,
                  background: isDark ? colors.gray[800] : colors.gray[100],
                  color: isDark ? colors.gray[300] : colors.gray[700],
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                {lane.state.columns.reduce((sum, column) => sum + column.cardIds.length, 0)} cards
              </span>
            </header>

            <KanbanBoard
              state={lane.state}
              onDragEnd={(result, stateBefore) =>
                handleLaneDragEnd(lane.id, result, stateBefore)
              }
              style={{ display: "flex", gap: "12px", overflowX: "auto", alignItems: "flex-start" }}
              renderColumn={(column) => (
                <div
                  style={{
                    minWidth: "260px",
                    padding: spacing.md,
                    borderRadius: borderRadius.lg,
                    background: isDark ? colors.gray[800] : colors.gray[50],
                    border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: isDark ? colors.gray[100] : colors.gray[900],
                        fontWeight: typography.fontWeight.semibold,
                        fontSize: typography.fontSize.sm,
                      }}
                    >
                      {column.title}
                    </span>
                    <span
                      style={{
                        color: isDark ? colors.gray[400] : colors.gray[600],
                        fontSize: typography.fontSize.xs,
                      }}
                    >
                      {column.cardIds.length}
                    </span>
                  </div>
                </div>
              )}
              renderCard={(card) => (
                <div
                  style={{
                    borderRadius: borderRadius.md,
                    padding: spacing.sm,
                    background: isDark ? colors.gray[800] : colors.white,
                    border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
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
          </section>
        ))}
      </div>
    </div>
  );
}
