import React, { useMemo } from 'react';
import { calendarConfig } from '../data/calendarConfig';
import { timetable, daysOfWeek } from '../data/timetable';
import { parseISO, isBefore, isAfter, startOfDay, addDays, format } from 'date-fns';

export default function AttendanceView({ courses, attendanceHistory }) {
  
  const stats = useMemo(() => {
    const today = startOfDay(new Date());
    const termStart = startOfDay(parseISO(calendarConfig.termStartDate));
    const termEnd = startOfDay(parseISO(calendarConfig.termEndDate));
    
    const endDate = isBefore(today, termEnd) ? today : termEnd;
    
    // Initialize stats
    const courseStats = {};
    courses.forEach(c => {
      courseStats[c.id] = { attended: 0, total: 0, absent: 0 };
    });

    // 1. Calculate the total possible classes that have happened so far
    let currentDate = termStart;
    while (!isAfter(currentDate, endDate)) {
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      
      let isHolidayOrExam = false;
      if (calendarConfig.holidays[formattedDate]) isHolidayOrExam = true;
      else {
        for (const exam of calendarConfig.exams) {
          if (
            (!isBefore(currentDate, parseISO(exam.start)) || formattedDate === exam.start) &&
            (!isAfter(currentDate, parseISO(exam.end)) || formattedDate === exam.end)
          ) {
            isHolidayOrExam = true;
            break;
          }
        }
      }
      
      if (!isHolidayOrExam) {
        let dayName = daysOfWeek[currentDate.getDay() - 1];
        if (calendarConfig.timetableSwaps[formattedDate]) {
          dayName = calendarConfig.timetableSwaps[formattedDate];
        }
        
        const daySchedule = timetable[dayName] || [];
        daySchedule.forEach(slotInfo => {
          courses.forEach(c => {
            if (c.slots.includes(slotInfo.slot)) {
              courseStats[c.id].total++;
              
              // Check if they marked attendance for this specific class
              const historyKey = `${formattedDate}_${c.id}`;
              const markedStatus = attendanceHistory[historyKey];
              
              if (markedStatus === 'present') courseStats[c.id].attended++;
              if (markedStatus === 'absent') courseStats[c.id].absent++;
            }
          });
        });
      }
      
      currentDate = addDays(currentDate, 1);
    }
    
    return courseStats;
  }, [courses, attendanceHistory]);

  const getPercentage = (attended, total) => {
    if (total === 0) return 100;
    return Math.round((attended / total) * 100);
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 75) return 'var(--success-color)';
    if (percentage >= 65) return '#f59e0b'; // amber
    return 'var(--danger-color)';
  };

  return (
    <div className="page-container">
      <h2>Attendance Tracker</h2>
      
      {courses.length === 0 ? (
        <div className="card text-center">
          <p className="text-sm">Add courses in the Manage tab to track attendance.</p>
        </div>
      ) : (
        <div className="flex-col gap-4">
          {courses.map(course => {
            const courseStat = stats[course.id];
            const percentage = getPercentage(courseStat.attended, courseStat.total);
            const unmarked = courseStat.total - courseStat.attended - courseStat.absent;
            
            return (
              <div key={course.id} className="card" style={{ marginBottom: 0 }}>
                <div className="flex-between">
                  <h3 style={{ margin: 0 }}>{course.name}</h3>
                  <span style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 700, 
                    color: getPercentageColor(percentage) 
                  }}>
                    {percentage}%
                  </span>
                </div>
                
                <p className="text-sm" style={{ margin: '0.5rem 0 0 0' }}>
                  {courseStat.attended} attended out of {courseStat.total} classes
                </p>
                {unmarked > 0 && (
                  <p className="text-xs" style={{ color: '#f59e0b', marginTop: '4px' }}>
                    Warning: {unmarked} classes are unmarked! Use the Calendar to update them.
                  </p>
                )}

                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: getPercentageColor(percentage)
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
