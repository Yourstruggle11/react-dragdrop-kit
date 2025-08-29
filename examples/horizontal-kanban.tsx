import React, { useState } from "react";
import { DragDropList } from "react-dragdrop-kit";

export function HorizontalKanbanExample() {
  const [columns, setColumns] = useState([
    { id: "1", position: 0, title: "To Do", count: 5 },
    { id: "2", position: 1, title: "In Progress", count: 3 },
    { id: "3", position: 2, title: "Review", count: 2 },
    { id: "4", position: 3, title: "Done", count: 8 },
  ]);

  return (
    <div className="kanban-board">
      <DragDropList
        items={columns}
        onReorder={(newItems) => setColumns(newItems)}
        direction="horizontal"
        gap={24}
        containerStyle={{
          padding: "24px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          minHeight: "400px",
        }}
        itemStyle={{
          width: "280px",
          height: "360px",
        }}
        renderItem={(column) => (
          <div className="kanban-column">
            <div className="column-header">
              <h3>{column.title}</h3>
              <span className="task-count">{column.count}</span>
            </div>
            <div className="column-content">
              {/* Your tasks would go here */}
              <div className="placeholder">Drop tasks here</div>
            </div>
          </div>
        )}
      />
    </div>
  );
}
