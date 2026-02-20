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

  test("supports horizontal left-edge destination reordering", () => {
    const items = [
      { id: "1", position: 0 },
      { id: "2", position: 1 },
      { id: "3", position: 2 },
      { id: "4", position: 3 },
    ];
    const mockOnReorder = jest.fn();
    extractClosestEdgeMock.mockReturnValue("left");

    renderHook(() =>
      useDragDropMonitor({
        items,
        onReorder: mockOnReorder,
        direction: "horizontal",
      })
    );

    const monitorConfig = monitorForElementsMock.mock.calls[0][0] as {
      onDrop: (payload: ElementEventPayloadMap["onDrop"]) => void;
    };

    triggerDrop(monitorConfig.onDrop, {
      source: { data: { type: "draggable-item", id: "3", index: 2 } },
      location: {
        current: {
          dropTargets: [{ data: { type: "draggable-item", id: "2", index: 1 } }],
        },
      },
    } as unknown as ElementEventPayloadMap["onDrop"]);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const [newItems] = mockOnReorder.mock.calls[0];
    expect(newItems.map((item: { id: string }) => item.id)).toEqual([
      "1",
      "3",
      "2",
      "4",
    ]);
  });

  test("reorders live during drag-over when liveReorder is enabled", () => {
    const items = [
      { id: "1", position: 0 },
      { id: "2", position: 1 },
      { id: "3", position: 2 },
    ];
    const mockOnReorder = jest.fn();
    extractClosestEdgeMock.mockReturnValue("right");

    renderHook(() =>
      useDragDropMonitor({
        items,
        onReorder: mockOnReorder,
        direction: "horizontal",
        liveReorder: true,
      })
    );

    const monitorConfig = monitorForElementsMock.mock.calls[0][0] as {
      onDropTargetChange: (
        payload: ElementEventPayloadMap["onDropTargetChange"]
      ) => void;
    };

    monitorConfig.onDropTargetChange({
      source: { data: { type: "draggable-item", id: "1", index: 0 } },
      location: {
        current: {
          dropTargets: [{ data: { type: "draggable-item", id: "2", index: 1 } }],
        },
      },
    } as unknown as ElementEventPayloadMap["onDropTargetChange"]);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const [newItems] = mockOnReorder.mock.calls[0];
    expect(newItems.map((item: { id: string }) => item.id)).toEqual([
      "2",
      "1",
      "3",
    ]);
  });

  test("computes destination from container pointer position when dropping in gaps", () => {
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

    const container = document.createElement("div");
    const makeItem = (id: string, top: number) => {
      const element = document.createElement("div");
      element.setAttribute("data-rdk-item-id", id);
      element.getBoundingClientRect = () =>
        ({
          top,
          left: 0,
          width: 200,
          height: 20,
          right: 200,
          bottom: top + 20,
          x: 0,
          y: top,
          toJSON: () => ({}),
        } as DOMRect);
      return element;
    };

    container.appendChild(makeItem("1", 40));
    container.appendChild(makeItem("2", 80));
    container.appendChild(makeItem("3", 120));

    const monitorConfig = monitorForElementsMock.mock.calls[0][0] as {
      onDrop: (payload: ElementEventPayloadMap["onDrop"]) => void;
    };

    triggerDrop(monitorConfig.onDrop, {
      source: { data: { type: "draggable-item", id: "3", index: 2 } },
      location: {
        current: {
          input: {
            altKey: false,
            button: 0,
            buttons: 0,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            clientX: 10,
            clientY: 30,
            pageX: 10,
            pageY: 30,
          },
          dropTargets: [{ data: { type: "container" }, element: container }],
        },
      },
    } as unknown as ElementEventPayloadMap["onDrop"]);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const [newItems] = mockOnReorder.mock.calls[0];
    expect(newItems.map((item: { id: string }) => item.id)).toEqual([
      "3",
      "1",
      "2",
    ]);
  });

  test("chooses nearest destination target when multiple draggable targets are present", () => {
    const items = [
      { id: "1", position: 0 },
      { id: "2", position: 1 },
      { id: "3", position: 2 },
      { id: "4", position: 3 },
      { id: "5", position: 4 },
    ];
    const mockOnReorder = jest.fn();
    extractClosestEdgeMock.mockReturnValue("top");

    renderHook(() =>
      useDragDropMonitor({
        items,
        onReorder: mockOnReorder,
      })
    );

    const farTarget = {
      data: { type: "draggable-item", id: "4", index: 3 },
      element: {
        getBoundingClientRect: () =>
          ({
            top: 200,
            left: 0,
            width: 200,
            height: 20,
            right: 200,
            bottom: 220,
            x: 0,
            y: 200,
            toJSON: () => ({}),
          } as DOMRect),
      },
    };
    const nearTarget = {
      data: { type: "draggable-item", id: "5", index: 4 },
      element: {
        getBoundingClientRect: () =>
          ({
            top: 40,
            left: 0,
            width: 200,
            height: 20,
            right: 200,
            bottom: 60,
            x: 0,
            y: 40,
            toJSON: () => ({}),
          } as DOMRect),
      },
    };

    const monitorConfig = monitorForElementsMock.mock.calls[0][0] as {
      onDrop: (payload: ElementEventPayloadMap["onDrop"]) => void;
    };

    triggerDrop(monitorConfig.onDrop, {
      source: { data: { type: "draggable-item", id: "1", index: 0 } },
      location: {
        current: {
          input: {
            altKey: false,
            button: 0,
            buttons: 0,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            clientX: 8,
            clientY: 48,
            pageX: 8,
            pageY: 48,
          },
          dropTargets: [farTarget, nearTarget],
        },
      },
    } as unknown as ElementEventPayloadMap["onDrop"]);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const [newItems] = mockOnReorder.mock.calls[0];
    expect(newItems.map((item: { id: string }) => item.id)).toEqual([
      "2",
      "3",
      "4",
      "5",
      "1",
    ]);
  });

  test("moves to target slot when dropping on immediate next item", () => {
    const items = [
      { id: "1", position: 0 },
      { id: "2", position: 1 },
      { id: "3", position: 2 },
    ];
    const mockOnReorder = jest.fn();
    extractClosestEdgeMock.mockReturnValue("top");

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
          input: {
            altKey: false,
            button: 0,
            buttons: 0,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            clientX: 10,
            clientY: 45,
            pageX: 10,
            pageY: 45,
          },
          dropTargets: [
            {
              data: { type: "draggable-item", id: "2", index: 1 },
              element: {
                getBoundingClientRect: () =>
                  ({
                    top: 40,
                    left: 0,
                    width: 200,
                    height: 20,
                    right: 200,
                    bottom: 60,
                    x: 0,
                    y: 40,
                    toJSON: () => ({}),
                  } as DOMRect),
              },
            },
          ],
        },
      },
    } as unknown as ElementEventPayloadMap["onDrop"]);

    expect(mockOnReorder).toHaveBeenCalledTimes(1);
    const [newItems] = mockOnReorder.mock.calls[0];
    expect(newItems.map((item: { id: string }) => item.id)).toEqual([
      "2",
      "1",
      "3",
    ]);
  });
});
