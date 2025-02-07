export interface Event {
  id: string;
  title: string;
  resourceId: string;
  start: Date;
  end: Date;
  color: string;
}

export interface Resource {
  id: string;
  name: string;
}

export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  eventId?: string;
}

export interface ResizeState {
  isResizing: boolean;
  edge: 'start' | 'end' | null;
  eventId?: string;
}