export const defaultStyles = {
  container: {
    default: {
      minHeight: "200px",
      transition: "all 0.2s ease",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column" as const,
      gap: "16px",
      padding: "16px",
    },
    dragging: {
      backgroundColor: "rgba(66, 153, 225, 0.05)",
      borderColor: "#3182ce",
    },
    horizontal: {
      flexDirection: "row" as const,
      flexWrap: "wrap" as const,
    },
  },
  item: {
    default: {
      transition: "all 0.2s ease",
      cursor: "grab",
      userSelect: "none" as const,
      position: "relative" as const,
    },
    dragging: {
      opacity: 0.5,
      cursor: "grabbing",
    },
    hover: {
      transform: "scale(1.02)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    disabled: {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
  preview: {
    position: "fixed" as const,
    pointerEvents: "none" as const,
    zIndex: 9999,
    opacity: 0.8,
    transform: "rotate(2deg)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
  },
  dropIndicator: {
    position: "absolute" as const,
    height: "2px",
    backgroundColor: "#3182ce",
    left: 0,
    right: 0,
    zIndex: 10,
    transition: "all 0.2s ease",
  },
};
