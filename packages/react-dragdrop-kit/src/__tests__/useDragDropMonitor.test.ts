import { renderHook } from "@testing-library/react";
import type { ElementEventPayloadMap } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useDragDropMonitor } from "../hooks/useDragDropMonitor";

const monitorForElementsMock = jest.fn();
const extractClosestEdgeMock = jest.fn();

jest.mock("@atlaskit/pragmatic-drag-and-drop/element/adapter", () => ({
  monitorForElements: (...args: unknown[]) => monitorForElementsMock(...args),
}));

jest.mock("@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge", () => ({
  extractClosestEdge: (...args: unknown[]) => extractClosestEdgeMock(...args),
}));

function triggerDrop(
  handler: (payload: ElementEventPayloadMap["onDrop"]) => void,
  payload: ElementEventPayloadMap["onDrop"]
) {
  handler(payload);
}

describe("useDragDropMonitor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    monitorForElementsMock.mockImplementation(() => () => {});
    extractClosestEdgeMock.mockReturnValue("bottom");
  });

  test("returns noop callback and does not register monitor when disabled", () => {
    const mockOnReorder = jest.fn();
    const mockItems = [
      { id: "1", position: 0 },
      { id: "2", position: 1 },
    ];

    const { result } = renderHook(() =>
      useDragDropMonitor({
        items: mockItems,
        onReorder: mockOnReorder,
        disabled: true,
      })
    );

    expect(typeof result.current).toBe("function");
    expect(monitorForElementsMock).not.toHaveBeenCalled();
  });

  test("reorders single dragged item using closest-edge destination", () => {
    const items = [
      { id: "1", position: 0 },
      { id: "2", position: 1 },
      { id: "3", position: 2 },
    ];
    const mockOnReorder = jest.fn();

    renderHook(() =>
      useDragDropMonitor({
        items,
        onReorder: mockOnReorder,
      })
    );

    const monitorConfig = monitorForElementsMock.mock.calls[0][0] as {
      onDrop: (payload: ElementEventPayloadMap["onDrop"]) => void;
    };

    triggerDrop(monitorConfig.onDrop, {
      source: { data: { type: "draggable-item", id: "1", index: 0 } },
      location: {
        current: {
          dropTargets: [{ data: { type: "draggable-item", id: "3", index: 2 } }],
        },
      },
    } as unknown as ElementEventPayloadMap["onDrop"]);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const [newItems, orderUpdates] = mockOnReorder.mock.calls[0];
    expect(newItems.map((item: { id: string }) => item.id)).toEqual(["2", "3", "1"]);
    expect(orderUpdates).toEqual(
      expect.arrayContaining([
        { id: "2", newPosition: 0, moved: true },
        { id: "3", newPosition: 1, moved: true },
        { id: "1", newPosition: 2, moved: true },
      ])
    );
  });

  test("reorders selected block when multi-drag is enabled", () => {
    const items = [
      { id: "1", position: 0 },
      { id: "2", position: 1 },
      { id: "3", position: 2 },
      { id: "4", position: 3 },
      { id: "5", position: 4 },
    ];
    const mockOnReorder = jest.fn();

    renderHook(() =>
      useDragDropMonitor({
        items,
        onReorder: mockOnReorder,
        selectedIds: ["2", "3"],
        multiDragEnabled: true,
      })
    );

    const monitorConfig = monitorForElementsMock.mock.calls[0][0] as {
      onDrop: (payload: ElementEventPayloadMap["onDrop"]) => void;
    };

    triggerDrop(monitorConfig.onDrop, {
      source: { data: { type: "draggable-item", id: "2", index: 1 } },
      location: {
        current: {
          dropTargets: [{ data: { type: "draggable-item", id: "5", index: 4 } }],
        },
      },
    } as unknown as ElementEventPayloadMap["onDrop"]);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const [newItems] = mockOnReorder.mock.calls[0];
    expect(newItems.map((item: { id: string }) => item.id)).toEqual([
      "1",
      "4",
      "5",
      "2",
      "3",
    ]);
  });
});
