import React, { useMemo } from 'react';
import { timetable, daysOfWeek } from '../data/timetable';
import { calendarConfig } from '../data/calendarConfig';
import { Clock, Check, X } from 'lucide-react';
import { format, parseISO, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';

export default function TimetableView({ courses, attendanceHistory, markAttendance, dateString }) {
  
  const selectedDate = dateString ? parseISO(dateString) : new Date();
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  
  const status = useMemo(() => {
    // 1. Check if before term start
    if (isBefore(selectedDate, startOfDay(parseISO(calendarConfig.termStartDate)))) {
      return { type: 'info', message: 'Term has not started yet.' };
    }
    // 2. Check if after term end
    if (isAfter(selectedDate, endOfDay(parseISO(calendarConfig.termEndDate)))) {
      return { type: 'info', message: 'Term has ended.' };
    }
    
    // 3. Check for holidays
    if (calendarConfig.holidays[formattedDate]) {
      return { type: 'holiday', message: `Holiday: ${calendarConfig.holidays[formattedDate]}` };
    }
    
    // 4. Check for exams
    for (const exam of calendarConfig.exams) {
      if (
        (isAfter(selectedDate, startOfDay(parseISO(exam.start))) || formattedDate === exam.start) &&
        (isBefore(selectedDate, endOfDay(parseISO(exam.end))) || formattedDate === exam.end)
      ) {
        return { type: 'exam', message: `${exam.name} - No regular classes` };
      }
    }
    
    // 5. Check weekend
    const dayIndex = selectedDate.getDay();
    if (dayIndex === 0 || dayIndex === 6) {
      return { type: 'info', message: 'Weekend - No classes' };
    }
    
    return { type: 'active' };
  }, [selectedDate, formattedDate]);

  const classesForDay = useMemo(() => {
    if (status.type !== 'active') return [];
    
    let dayName = daysOfWeek[selectedDate.getDay() - 1];
    
    // Swap check (e.g. 17 Nov follows Friday timetable)
    if (calendarConfig.timetableSwaps[formattedDate]) {
      dayName = calendarConfig.timetableSwaps[formattedDate];
    }
    
    const daySchedule = timetable[dayName] || [];
    
    // Map the slots to the user's courses
    const scheduleWithCourses = daySchedule.map(slotInfo => {
      const courseForSlot = courses.find(c => c.slots.includes(slotInfo.slot));
      return {
        ...slotInfo,
        course: courseForSlot
      };
    }).filter(item => item.course);

    return scheduleWithCourses.sort((a, b) => a.start.localeCompare(b.start));
  }, [selectedDate, formattedDate, status, courses]);

  // Check if a class has ended to prompt attendance (only for today)
  const isClassFinished = (endTime) => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    if (formattedDate !== todayStr) return false;
    
    const now = new Date();
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0, 0);
    
    return now > endDate;
  };

  return (
    <div className="page-container">
      <h2>Schedule for {format(selectedDate, 'MMM d, yyyy')}</h2>
      
      {status.type !== 'active' ? (
        <div className="card text-center text-secondary">
          <p>{status.message}</p>
        </div>
      ) : classesForDay.length === 0 ? (
        <div className="card text-center text-secondary">
          <p>No classes scheduled for today.</p>
        </div>
      ) : (
        <div className="flex-col gap-4">
          {classesForDay.map((item, idx) => {
            const attendanceKey = `${formattedDate}_${item.course.id}`;
            const currentAttendance = attendanceHistory[attendanceKey];
            const finished = isClassFinished(item.end);
            
            return (
              <div key={`${item.slot}-${idx}`} className="card" style={{ marginBottom: 0 }}>
                <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    <Clock size={16} />
                    <span>{item.start} - {item.end}</span>
                  </div>
                  <span className="slot-badge">{item.slot}</span>
                </div>
                
                <h3 style={{ margin: '0.5rem 0 1rem 0' }}>{item.course.name}</h3>

                {/* Show attendance buttons if we are backdating (viewing a past date) OR if class is finished today */}
                {(isBefore(selectedDate, startOfDay(new Date())) || finished) && (
                  <div style={{ 
                    background: currentAttendance ? 'var(--surface-color-light)' : 'rgba(59, 130, 246, 0.1)', 
                    border: currentAttendance ? '1px solid var(--border-color)' : '1px solid rgba(59, 130, 246, 0.3)',
                    padding: '1rem',
                    borderRadius: '12px',
                    marginTop: '1rem'
                  }}>
                    <p className="text-sm" style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      {currentAttendance ? 'Attendance marked:' : 'Mark your attendance:'}
                    </p>
                    <div className="flex-between gap-4">
                      <button 
                        className={`btn ${currentAttendance === 'present' ? 'btn-success' : 'btn-secondary'}`} 
                        onClick={() => markAttendance(formattedDate, item.course.id, currentAttendance === 'present' ? null : 'present')}
                      >
                        <Check size={18} /> Present
                      </button>
                      <button 
                        className={`btn ${currentAttendance === 'absent' ? 'btn-danger' : 'btn-secondary'}`} 
                        onClick={() => markAttendance(formattedDate, item.course.id, currentAttendance === 'absent' ? null : 'absent')}
                      >
                        <X size={18} /> Absent
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
