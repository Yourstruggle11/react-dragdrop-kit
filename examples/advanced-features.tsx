import React, { useState, useRef } from "react";
import { DragDropList } from "react-dragdrop-kit";

export function AdvancedFeaturesExample() {
  const [items, setItems] = useState([
    { id: "1", position: 0, name: "Item 1", locked: false },
    { id: "2", position: 1, name: "Item 2", locked: true },
    { id: "3", position: 2, name: "Item 3", locked: false },
  ]);

  const [dragHistory, setDragHistory] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleDragStart = (item, index) => {
    // Play sound effect
    audioRef.current?.play();

    // Log drag action
    setDragHistory((prev) => [...prev, `Started dragging ${item.name}`]);

    // Haptic feedback on mobile
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleDragEnd = (item, index) => {
    setDragHistory((prev) => [...prev, `Finished dragging ${item.name}`]);
  };

  const handleReorder = (newItems, orderUpdates) => {
    setItems(newItems);

    // Optimistic update with rollback capability
    const rollback = [...items];

    // Simulate API call
    fetch("/api/reorder", {
      method: "POST",
      body: JSON.stringify(orderUpdates),
    }).catch(() => {
      // Rollback on error
      setItems(rollback);
      alert("Failed to save order");
    });
  };

  return (
    <div>
      <audio ref={audioRef} src="/drag-sound.mp3" />

      <DragDropList
        items={items.filter((item) => !item.locked)}
        onReorder={handleReorder}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        showDropIndicator
        renderItem={(item) => (
          <div className="advanced-item">
            <span>{item.name}</span>
            {item.locked && <span className="lock-icon">🔒</span>}
          </div>
        )}
      />

      <div className="drag-history">
        <h4>Drag History:</h4>
        {dragHistory.map((entry, i) => (
          <div key={i}>{entry}</div>
        ))}
      </div>
    </div>
  );
}
