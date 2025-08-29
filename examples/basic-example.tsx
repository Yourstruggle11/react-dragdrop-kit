import React, { useState } from "react";
import { DragDropList } from "react-dragdrop-kit";
import type { DraggableItem } from "react-dragdrop-kit";

interface TodoItem extends DraggableItem {
  id: string;
  position: number;
  title: string;
  completed: boolean;
}

export function BasicExample() {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: "1", position: 0, title: "Learn React", completed: false },
    { id: "2", position: 1, title: "Build awesome app", completed: false },
    { id: "3", position: 2, title: "Deploy to production", completed: false },
  ]);

  const handleReorder = (newItems: TodoItem[], orderUpdates: any) => {
    setTodos(newItems);
    console.log("Order updates to send to API:", orderUpdates);
  };

  return (
    <DragDropList
      items={todos}
      onReorder={handleReorder}
      containerClassName="todo-list"
      itemClassName="todo-item"
      renderItem={(item) => (
        <div className="todo-content">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => {
              /* toggle */
            }}
          />
          <span>{item.title}</span>
        </div>
      )}
    />
  );
}
