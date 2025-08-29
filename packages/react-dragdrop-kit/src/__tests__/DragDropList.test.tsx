import React from "react";
import { render, screen } from "@testing-library/react";
import { DragDropList } from "../components/DragDropList";
import "@testing-library/jest-dom";
import type { DraggableItem } from "../types";

describe("DragDropList", () => {
  const mockItems: DraggableItem[] = [
    { id: "1", position: 0, name: "Item 1" },
    { id: "2", position: 1, name: "Item 2" },
    { id: "3", position: 2, name: "Item 3" },
  ];

  const mockOnReorder = jest.fn();
  const mockRenderItem = (item: DraggableItem) => <div>{item.name}</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all items", () => {
    render(
      <DragDropList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={mockRenderItem}
      />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  test("applies custom className and styles", () => {
    const { container } = render(
      <DragDropList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={mockRenderItem}
        containerClassName="custom-class"
        containerStyle={{ backgroundColor: "red", color: "white" }}
      />
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass("custom-class");

    // Test the actual computed styles - colors get converted to rgb values
    expect(containerElement).toHaveStyle({ color: "rgb(255, 255, 255)" });

    // Check for the inline style attribute directly
    expect(containerElement.style.backgroundColor).toBe("red");
  });

  test("respects disabled prop", () => {
    const { container } = render(
      <DragDropList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={mockRenderItem}
        disabled={true}
      />
    );

    // When disabled, items should have disabled cursor style
    const items = container.querySelectorAll("[data-index]");
    expect(items).toHaveLength(3);
    items.forEach((item) => {
      expect(item).toHaveStyle({ cursor: "not-allowed", opacity: "0.6" });
    });
  });

  test("renders draggable items with proper attributes", () => {
    const mockDragStart = jest.fn();
    const mockDragEnd = jest.fn();

    render(
      <DragDropList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={mockRenderItem}
        onDragStart={mockDragStart}
        onDragEnd={mockDragEnd}
      />
    );

    const items = screen.getAllByText(/Item \d/);
    expect(items).toHaveLength(3);

    // Verify each item is wrapped in a draggable container
    items.forEach((item, index) => {
      const wrapper = item.parentElement;
      expect(wrapper).toHaveAttribute("data-index", index.toString());
    });
  });

  test("renders in horizontal direction", () => {
    const { container } = render(
      <DragDropList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={mockRenderItem}
        direction="horizontal"
      />
    );

    const containerElement = container.firstChild;
    expect(containerElement).toHaveStyle({ flexDirection: "row" });
  });
});
