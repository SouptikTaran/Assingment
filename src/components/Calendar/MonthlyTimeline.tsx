import React, { useState, useCallback, useRef } from 'react';
import type { Event, Resource, DragState, ResizeState } from '../../types';
import { TimelineEvent } from './TimelineEvent';
import { EventDialog } from './EventDialog';

interface MonthlyTimelineProps {
  events: Event[];
  resources: Resource[];
  currentDate: Date;
  onEventUpdate: (event: Event) => void;
  onEventCreate: (event: Partial<Event>) => void;
  onEventDelete: (eventId: string) => void;
}

export function MonthlyTimeline({
  events,
  resources,
  currentDate,
  onEventUpdate,
  onEventCreate,
  onEventDelete,
}: MonthlyTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
  });
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    edge: null,
    eventId: undefined,
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEventData, setNewEventData] = useState<Partial<Event> | undefined>();

  const getDaysInMonth = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentDate]);

  const days = getDaysInMonth();
  const today = new Date();

  const getEventStyle = (event: Event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const startDay = startDate.getDate() - 1;
    const endDay = endDate.getDate() - 1;
    const width = (endDay - startDay + 1) * (100 / days.length);
    const left = startDay * (100 / days.length);

    return {
      left: `${left}%`,
      width: `${width}%`,
      top: '4px',
      height: 'calc(100% - 8px)',
    };
  };

  const getDateFromPosition = (x: number): Date => {
    if (!timelineRef.current) return new Date();
    const rect = timelineRef.current.getBoundingClientRect();
    const dayWidth = rect.width / days.length;
    const dayIndex = Math.floor((x - rect.left) / dayWidth);
    return days[Math.max(0, Math.min(dayIndex, days.length - 1))];
  };

  const findEventAtPosition = (x: number, resourceId: string): Event | undefined => {
    if (!timelineRef.current) return undefined;
    
    const clickedDate = getDateFromPosition(x);
    return events.find((event) => {
      if (event.resourceId !== resourceId) return false;
      
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      const clickTime = clickedDate.getTime();
      
      return clickTime >= startDate.getTime() && clickTime <= endDate.getTime();
    });
  };

  const handleMouseDown = (e: React.MouseEvent, resourceId: string) => {
    if (!timelineRef.current) return;

    const existingEvent = findEventAtPosition(e.clientX, resourceId);
    
    if (existingEvent) {
      setSelectedEvent(existingEvent);
      setIsDialogOpen(true);
      return;
    }

    const startDate = getDateFromPosition(e.clientX);
    setNewEventData({
      resourceId,
      start: startDate,
      end: startDate,
    });
    setDragState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const handleResizeStart = (event: Event, edge: 'start' | 'end') => {
    setResizeState({
      isResizing: true,
      edge,
      eventId: event.id,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragState.isDragging && newEventData && timelineRef.current) {
      const currentDate = getDateFromPosition(e.clientX);
      setNewEventData((prev) => ({
        ...prev,
        end: currentDate,
      }));
    } else if (resizeState.isResizing && resizeState.eventId && timelineRef.current) {
      const currentDate = getDateFromPosition(e.clientX);
      const event = events.find((e) => e.id === resizeState.eventId);
      
      if (event) {
        const updatedEvent = { ...event };
        if (resizeState.edge === 'start') {
          updatedEvent.start = currentDate;
        } else {
          updatedEvent.end = currentDate;
        }
        
        // Ensure start date is not after end date
        if (new Date(updatedEvent.start) <= new Date(updatedEvent.end)) {
          onEventUpdate(updatedEvent);
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (dragState.isDragging && newEventData) {
      setIsDialogOpen(true);
    }
    setDragState({ isDragging: false, startX: 0, startY: 0 });
    setResizeState({ isResizing: false, edge: null, eventId: undefined });
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleEventSave = (eventData: Partial<Event>) => {
    if (eventData.id) {
      onEventUpdate(eventData as Event);
    } else {
      onEventCreate(eventData);
    }
    setSelectedEvent(undefined);
    setNewEventData(undefined);
    setIsDialogOpen(false);
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      onEventDelete(selectedEvent.id);
      setSelectedEvent(undefined);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <div
        ref={timelineRef}
        className="flex-1 overflow-x-auto"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] border-b dark:border-gray-700">
          {days.map((day) => (
            <div
              key={day.getTime()}
              className={`p-2 text-center border-r dark:border-gray-700 ${
                day.getDate() === today.getDate() &&
                day.getMonth() === today.getMonth() &&
                day.getFullYear() === today.getFullYear()
                  ? 'bg-blue-50 dark:bg-blue-900/20'
                  : ''
              }`}
            >
              <div className="text-sm font-medium dark:text-white">
                {day.getDate()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {day.toLocaleString('default', { weekday: 'short' })}
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="h-16 border-b dark:border-gray-700 relative"
              onMouseDown={(e) => handleMouseDown(e, resource.id)}
            >
              {events
                .filter((event) => event.resourceId === resource.id)
                .map((event) => (
                  <TimelineEvent
                    key={event.id}
                    event={event}
                    onEventClick={handleEventClick}
                    onResizeStart={handleResizeStart}
                    style={getEventStyle(event)}
                  />
                ))}
              {dragState.isDragging &&
                newEventData?.resourceId === resource.id && (
                  <TimelineEvent
                    event={{
                      id: 'new',
                      title: 'New Event',
                      color: '#3b82f6',
                      ...newEventData,
                    } as Event}
                    onEventClick={() => {}}
                    style={getEventStyle({
                      id: 'new',
                      title: 'New Event',
                      color: '#3b82f6',
                      ...newEventData,
                    } as Event)}
                  />
                )}
            </div>
          ))}
        </div>
      </div>
      <EventDialog
        event={selectedEvent || newEventData}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedEvent(undefined);
          setNewEventData(undefined);
        }}
        onSave={handleEventSave}
        onDelete={selectedEvent ? handleEventDelete : undefined}
      />
    </>
  );
}