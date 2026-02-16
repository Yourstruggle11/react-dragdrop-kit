export type DraggableItem = {
  id: string;
  position: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type OrderUpdate = {
  id: string;
  newPosition: number;
  moved?: boolean;
};

export type DragDropListProps<T extends DraggableItem> = {
  items: T[];
  onReorder: (newItems: T[], orderUpdates: OrderUpdate[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  dragPreviewClassName?: string;
  dragPreviewStyle?: React.CSSProperties;
  onDragStart?: (item: T, index: number) => void;
  onDragEnd?: (item: T, index: number) => void;
  disabled?: boolean;
  gap?: number | string;
  direction?: "vertical" | "horizontal";
  showDropIndicator?: boolean;
  dropIndicatorClassName?: string;
  dropIndicatorStyle?: React.CSSProperties;
  dropIndicatorPosition?: "top" | "bottom";
  dragHandle?: string;
  selectedIds?: string[];
  multiDragEnabled?: boolean;
};

export type DraggableItemWrapperProps<T extends DraggableItem> = {
  item: T;
  index: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dragPreviewClassName?: string;
  dragPreviewStyle?: React.CSSProperties;
  onDragStart?: (item: T, index: number) => void;
  onDragEnd?: (item: T, index: number) => void;
  disabled?: boolean;
  showDropIndicator?: boolean;
  dropIndicatorClassName?: string;
  dropIndicatorStyle?: React.CSSProperties;
  dropIndicatorPosition?: "top" | "bottom";
  direction?: "vertical" | "horizontal";
  dragHandle?: string;
};
