import React, { useState } from "react";
import { DragDropList } from "react-dragdrop-kit";

export function TailwindExample() {
  const [items, setItems] = useState([
    { id: "1", position: 0, name: "Dashboard", icon: "📊" },
    { id: "2", position: 1, name: "Projects", icon: "📁" },
    { id: "3", position: 2, name: "Team", icon: "👥" },
    { id: "4", position: 3, name: "Calendar", icon: "📅" },
  ]);

  return (
    <DragDropList
      items={items}
      onReorder={(newItems) => setItems(newItems)}
      containerClassName="bg-gray-50 rounded-xl p-6 space-y-2"
      itemClassName="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 cursor-move"
      dragPreviewClassName="bg-blue-100 rounded-lg shadow-2xl"
      showDropIndicator
      dropIndicatorClassName="bg-blue-500"
      renderItem={(item) => (
        <div className="flex items-center p-4 space-x-3">
          <span className="text-2xl">{item.icon}</span>
          <span className="font-medium text-gray-700">{item.name}</span>
          <div className="ml-auto">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </div>
        </div>
      )}
    />
  );
}
