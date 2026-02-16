import { useMemo, useState } from "react";
import { DragDropList } from "react-dragdrop-kit";
import { useThemeMode } from "@/contexts/useThemeMode";
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from "@/constants/designSystem";
import { useDebouncedToast } from "@/hooks/useDebouncedToast";

interface QueueItem {
  id: string;
  position: number;
  title: string;
  owner: string;
  eta: string;
}

const initialItems: QueueItem[] = [
  { id: "issue-1", position: 0, title: "Fix drag flicker", owner: "Riya", eta: "Today" },
  { id: "issue-2", position: 1, title: "Add reorder regression test", owner: "Noah", eta: "Tomorrow" },
  { id: "issue-3", position: 2, title: "Document new list props", owner: "Ava", eta: "Today" },
  { id: "issue-4", position: 3, title: "Ship kanban examples", owner: "Liam", eta: "2 days" },
  { id: "issue-5", position: 4, title: "Polish demo onboarding", owner: "Mia", eta: "3 days" },
];

export default function DropIndicatorExample() {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";
  const [items, setItems] = useState<QueueItem[]>(initialItems);
  const [indicatorPosition, setIndicatorPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const { showToast } = useDebouncedToast();

  const indicatorStyle = useMemo(
    () => ({
      height: "3px",
      borderRadius: borderRadius.full,
      background: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.info[500]})`,
      boxShadow: `0 0 0 2px ${isDark ? colors.gray[900] : colors.white}`,
    }),
    [isDark]
  );

  const handleReorder = (nextItems: QueueItem[]) => {
    setItems(nextItems.map((item, index) => ({ ...item, position: index })));
    showToast("Drop position updated");
  };

  return (
    <div style={{ padding: spacing.xl }}>
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <h2
          style={{
            margin: 0,
            marginBottom: spacing.sm,
            color: isDark ? colors.white : colors.gray[900],
            fontSize: typography.fontSize["2xl"],
            fontWeight: typography.fontWeight.bold,
          }}
        >
          Drop Indicator
        </h2>
        <p
          style={{
            margin: 0,
            marginBottom: spacing.lg,
            color: isDark ? colors.gray[400] : colors.gray[600],
            fontSize: typography.fontSize.base,
          }}
        >
          Visualize exactly where an item will be inserted while dragging.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
            marginBottom: spacing.lg,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setIndicatorPosition("top")}
            style={{
              padding: `${spacing.xs} ${spacing.md}`,
              borderRadius: borderRadius.md,
              border: `1px solid ${indicatorPosition === "top" ? colors.primary[500] : isDark ? colors.gray[600] : colors.gray[300]}`,
              background:
                indicatorPosition === "top"
                  ? `${colors.primary[500]}22`
                  : isDark
                    ? colors.gray[800]
                    : colors.white,
              color: isDark ? colors.gray[100] : colors.gray[800],
              cursor: "pointer",
              fontWeight: typography.fontWeight.medium,
            }}
          >
            Indicator on Top
          </button>
          <button
            type="button"
            onClick={() => setIndicatorPosition("bottom")}
            style={{
              padding: `${spacing.xs} ${spacing.md}`,
              borderRadius: borderRadius.md,
              border: `1px solid ${indicatorPosition === "bottom" ? colors.primary[500] : isDark ? colors.gray[600] : colors.gray[300]}`,
              background:
                indicatorPosition === "bottom"
                  ? `${colors.primary[500]}22`
                  : isDark
                    ? colors.gray[800]
                    : colors.white,
              color: isDark ? colors.gray[100] : colors.gray[800],
              cursor: "pointer",
              fontWeight: typography.fontWeight.medium,
            }}
          >
            Indicator on Bottom
          </button>
        </div>

        <DragDropList
          items={items}
          onReorder={handleReorder}
          showDropIndicator
          dropIndicatorPosition={indicatorPosition}
          dropIndicatorStyle={indicatorStyle}
          gap={12}
          renderItem={(item) => (
            <div
              style={{
                padding: spacing.lg,
                borderRadius: borderRadius.lg,
                border: `1px solid ${isDark ? colors.gray[700] : colors.gray[200]}`,
                background: isDark ? colors.gray[800] : colors.white,
                boxShadow: shadows.sm,
                display: "grid",
                gap: spacing.xs,
              }}
            >
              <div
                style={{
                  color: isDark ? colors.gray[50] : colors.gray[900],
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.base,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: spacing.sm,
                  color: isDark ? colors.gray[400] : colors.gray[600],
                  fontSize: typography.fontSize.sm,
                }}
              >
                <span>Owner: {item.owner}</span>
                <span>ETA: {item.eta}</span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
