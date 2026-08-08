import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import BottomNav from './components/BottomNav';
import TimetableView from './components/TimetableView';
import AttendanceView from './components/AttendanceView';
import CourseManagement from './components/CourseManagement';
import CalendarView from './components/CalendarView';
import { format } from 'date-fns';

function App() {
  const [currentView, setCurrentView] = useState('timetable');
  const [courses, setCourses] = useLocalStorage('tracker_courses', []);
  
  // Format: { "YYYY-MM-DD_courseId": "present" | "absent" }
  const [attendanceHistory, setAttendanceHistory] = useLocalStorage('tracker_attendance_history', {});

  const markAttendance = (date, courseId, status) => {
    const key = `${date}_${courseId}`;
    if (status === null) {
      // Remove attendance
      const newHistory = { ...attendanceHistory };
      delete newHistory[key];
      setAttendanceHistory(newHistory);
    } else {
      setAttendanceHistory({
        ...attendanceHistory,
        [key]: status // 'present' or 'absent'
      });
    }
  };

  return (
    <>
      {currentView === 'timetable' && (
        <TimetableView 
          courses={courses} 
          attendanceHistory={attendanceHistory} 
          markAttendance={markAttendance} 
        />
      )}
      
      {currentView === 'calendar' && (
        <CalendarView
          courses={courses}
          attendanceHistory={attendanceHistory}
          markAttendance={markAttendance}
        />
      )}

      {currentView === 'attendance' && (
        <AttendanceView 
          courses={courses} 
          attendanceHistory={attendanceHistory} 
        />
      )}
      
      {currentView === 'manage' && (
        <CourseManagement 
          courses={courses} 
          setCourses={setCourses} 
        />
      )}

      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </>
  );
}

export default App;
