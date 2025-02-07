import React from 'react';
import type { Event } from '../../types';

interface TimelineEventProps {
  event: Event;
  onEventClick: (event: Event) => void;
  onResizeStart?: (event: Event, edge: 'start' | 'end') => void;
  style: React.CSSProperties;
}

export function TimelineEvent({
  event,
  onEventClick,
  onResizeStart,
  style
}: TimelineEventProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEventClick(event);
  };

  const handleResizeStart = (e: React.MouseEvent, edge: 'start' | 'end') => {
    e.stopPropagation();
    onResizeStart?.(event, edge);
  };

  return (
    <div
      className="absolute rounded-md p-1 text-sm cursor-pointer overflow-hidden group"
      style={{
        ...style,
        backgroundColor: event.color + '33',
        borderLeft: `3px solid ${event.color}`,
      }}
      onClick={handleClick}
    >
      <div className="font-medium truncate dark:text-gray-800">{event.title}</div>
      
      {/* Resize handles */}
      {onResizeStart && (
        <>
          <div
            className="absolute left-0 top-0 w-2 h-full cursor-ew-resize opacity-0 group-hover:opacity-100 hover:bg-blue-200 dark:hover:bg-blue-600"
            onMouseDown={(e) => handleResizeStart(e, 'start')}
          />
          <div
            className="absolute right-0 top-0 w-2 h-full cursor-ew-resize opacity-0 group-hover:opacity-100 hover:bg-blue-200 dark:hover:bg-blue-600"
            onMouseDown={(e) => handleResizeStart(e, 'end')}
          />
        </>
      )}
    </div>
  );
}