import React, { useState, useCallback } from 'react';
import { CalendarHeader } from './components/Calendar/CalendarHeader';
import { ResourceList } from './components/Calendar/ResourceList';
import { MonthlyTimeline } from './components/Calendar/MonthlyTimeline';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Event, Resource } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);
  const [resources, setResources] = useLocalStorage<Resource[]>('resources', [
    { id: '1', name: 'Resource 1' },
    { id: '2', name: 'Resource 2' },
    { id: '3', name: 'Resource 3' },
  ]);
  const [events, setEvents] = useLocalStorage<Event[]>('events', [
    {
      id: '1',
      title: 'Event 1',
      resourceId: '1',
      start: new Date(2024, 2, 1),
      end: new Date(2024, 2, 3),
      color: '#3b82f6',
    },
    {
      id: '2',
      title: 'Event 2',
      resourceId: '2',
      start: new Date(2024, 2, 5),
      end: new Date(2024, 2, 7),
      color: '#10b981',
    },
  ]);

  const handlePrevMonth = useCallback(() => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      return newDate;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentDate((date) => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      return newDate;
    });
  }, []);

  const handleAddResource = useCallback(() => {
    const newResource: Resource = {
      id: Date.now().toString(),
      name: `Resource ${resources.length + 1}`,
    };
    setResources([...resources, newResource]);
  }, [resources, setResources]);

  const handleEventUpdate = useCallback(
    (updatedEvent: Event) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
    },
    [setEvents]
  );

  const handleEventCreate = useCallback(
    (eventData: Partial<Event>) => {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: 'New Event',
        color: '#3b82f6',
        ...eventData,
      } as Event;
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    },
    [setEvents]
  );

  const handleEventDelete = useCallback(
    (eventId: string) => {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    },
    [setEvents]
  );

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        <div className="flex flex-1 overflow-hidden">
          <ResourceList
            resources={resources}
            onAddResource={handleAddResource}
          />
          <MonthlyTimeline
            events={events}
            resources={resources}
            currentDate={currentDate}
            onEventUpdate={handleEventUpdate}
            onEventCreate={handleEventCreate}
            onEventDelete={handleEventDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;