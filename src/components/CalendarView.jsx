import React, { useState } from 'react';
import { 
  format, addMonths, subMonths, startOfMonth, 
  endOfMonth, startOfWeek, endOfWeek, isSameMonth, 
  isSameDay, addDays 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TimetableView from './TimetableView';

export default function CalendarView({ courses, attendanceHistory, markAttendance }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <button className="btn-icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ChevronLeft />
        </button>
        <h3 style={{ margin: 0 }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button className="btn-icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {format(addDays(startDate, i), 'EEEEEE')}
        </div>
      );
    }

    return <div style={{ display: 'flex', marginBottom: '0.5rem' }}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDateFull = format(day, 'yyyy-MM-dd');
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const isHoliday = !!calendarConfig.holidays[formattedDateFull];
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day}
            onClick={() => setSelectedDate(cloneDay)}
            style={{
              flex: 1,
              aspectRatio: '1/1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: '50%',
              margin: '2px',
              backgroundColor: isSelected ? 'var(--accent-color)' : (isHoliday ? 'rgba(239, 68, 68, 0.1)' : 'transparent'),
              color: isSelected ? 'white' : (isHoliday ? 'var(--danger-color)' : (isCurrentMonth ? 'var(--text-primary)' : 'var(--text-secondary)')),
              fontWeight: isSelected || isHoliday ? 'bold' : 'normal',
              position: 'relative'
            }}
          >
            <span>{formattedDate}</span>
            {isHoliday && !isSelected && (
              <div style={{
                position: 'absolute',
                bottom: '4px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--danger-color)'
              }} />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} style={{ display: 'flex' }}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="page-container" style={{ paddingBottom: '0' }}>
      <div className="card">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <TimetableView 
          courses={courses}
          attendanceHistory={attendanceHistory}
          markAttendance={markAttendance}
          dateString={format(selectedDate, 'yyyy-MM-dd')}
        />
      </div>
    </div>
  );
}
