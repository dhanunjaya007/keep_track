import React from 'react';
import { Calendar, CheckSquare, Settings, CalendarDays } from 'lucide-react';

export default function BottomNav({ currentView, setCurrentView }) {
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${currentView === 'timetable' ? 'active' : ''}`}
        onClick={() => setCurrentView('timetable')}
      >
        <CalendarDays />
        <span>Today</span>
      </button>
      <button 
        className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`}
        onClick={() => setCurrentView('calendar')}
      >
        <Calendar />
        <span>Calendar</span>
      </button>
      <button 
        className={`nav-item ${currentView === 'attendance' ? 'active' : ''}`}
        onClick={() => setCurrentView('attendance')}
      >
        <CheckSquare />
        <span>Stats</span>
      </button>
      <button 
        className={`nav-item ${currentView === 'manage' ? 'active' : ''}`}
        onClick={() => setCurrentView('manage')}
      >
        <Settings />
        <span>Manage</span>
      </button>
    </nav>
  );
}
