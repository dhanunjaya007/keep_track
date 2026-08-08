import React, { useState } from 'react';
import { allSlots } from '../data/timetable';
import { Trash2, Plus } from 'lucide-react';

export default function CourseManagement({ courses, setCourses }) {
  const [newCourseName, setNewCourseName] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourseName.trim() || selectedSlots.length === 0) return;

    const courseId = Date.now().toString();
    const newCourse = {
      id: courseId,
      name: newCourseName,
      slots: selectedSlots
    };

    setCourses([...courses, newCourse]);
    setNewCourseName('');
    setSelectedSlots([]);
  };

  const toggleSlotSelection = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="page-container">
      <h2>Manage Courses</h2>
      
      <div className="card">
        <h3>Add New Course</h3>
        <form onSubmit={handleAddCourse}>
          <input 
            type="text" 
            placeholder="Course Name (e.g. Data Structures)" 
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
          />
          
          <div style={{ marginBottom: '1rem' }}>
            <p className="text-sm" style={{ marginBottom: '0.5rem' }}>Select Slots:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {allSlots.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlotSelection(slot)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: selectedSlots.includes(slot) ? 'var(--accent-color)' : 'transparent',
                    color: selectedSlots.includes(slot) ? 'white' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          
          <button type="submit" className="btn">
            <Plus size={18} /> Add Course
          </button>
        </form>
      </div>

      <div>
        <h3>Your Courses</h3>
        {courses.length === 0 ? (
          <p className="text-sm">No courses added yet.</p>
        ) : (
          <div className="flex-col gap-4">
            {courses.map(course => (
              <div key={course.id} className="card flex-between" style={{ marginBottom: 0 }}>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>{course.name}</h4>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {course.slots.map(s => (
                      <span key={s} className="slot-badge">{s}</span>
                    ))}
                  </div>
                </div>
                <button 
                  className="btn-icon" 
                  style={{ background: 'transparent', color: 'var(--danger-color)', border: 'none' }}
                  onClick={() => deleteCourse(course.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
