import React from "react";
import { render } from "@testing-library/react";
import { DraggableItemWrapper } from "../components/DraggableItemWrapper";

const draggableMock = jest.fn();
const dropTargetForElementsMock = jest.fn();
const combineMock = jest.fn();
const attachClosestEdgeMock = jest.fn();

jest.mock("@atlaskit/pragmatic-drag-and-drop/element/adapter", () => ({
  draggable: (...args: unknown[]) => draggableMock(...args),
  dropTargetForElements: (...args: unknown[]) => dropTargetForElementsMock(...args),
}));

jest.mock("@atlaskit/pragmatic-drag-and-drop/combine", () => ({
  combine: (...args: Array<() => void>) => combineMock(...args),
}));

jest.mock("@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge", () => ({
  attachClosestEdge: (...args: unknown[]) => attachClosestEdgeMock(...args),
}));

describe("DraggableItemWrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    draggableMock.mockImplementation(() => () => {});
    dropTargetForElementsMock.mockImplementation(() => () => {});
    combineMock.mockImplementation((...cleanups: Array<() => void>) => () => {
      cleanups.forEach((cleanup) => cleanup());
    });
    attachClosestEdgeMock.mockImplementation((data: unknown) => data);
  });

  test("disables dragging when drag handle selector does not resolve", () => {
    render(
      <DraggableItemWrapper
        item={{ id: "1", position: 0 }}
        index={0}
        dragHandle="[data-drag-handle]"
      >
        <div>No handle here</div>
      </DraggableItemWrapper>
    );

    const draggableConfig = draggableMock.mock.calls[0][0] as {
      canDrag: () => boolean;
      dragHandle?: Element;
    };

    expect(draggableConfig.dragHandle).toBeUndefined();
    expect(draggableConfig.canDrag()).toBe(false);
  });

  test("uses resolved drag handle element when selector matches", () => {
    const { container } = render(
      <DraggableItemWrapper
        item={{ id: "2", position: 1 }}
        index={1}
        dragHandle="[data-drag-handle]"
      >
        <div>
          <button type="button" data-drag-handle>
            Handle
          </button>
        </div>
      </DraggableItemWrapper>
    );

    const handleElement = container.querySelector("[data-drag-handle]");
    const draggableConfig = draggableMock.mock.calls[0][0] as {
      canDrag: () => boolean;
      dragHandle?: Element;
    };

    expect(handleElement).toBeTruthy();
    expect(draggableConfig.dragHandle).toBe(handleElement);
    expect(draggableConfig.canDrag()).toBe(true);
  });
});
