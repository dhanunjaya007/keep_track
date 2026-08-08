export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const timetable = {
  Monday: [
    { start: "08:30", end: "09:25", slot: "A1" },
    { start: "09:30", end: "10:25", slot: "B1" },
    { start: "10:30", end: "11:25", slot: "C1" },
    { start: "11:30", end: "12:25", slot: "S1" },
    { start: "14:00", end: "14:55", slot: "H1" },
    { start: "15:00", end: "15:55", slot: "I1" },
    { start: "16:00", end: "16:55", slot: "J1" },
    { start: "17:00", end: "17:55", slot: "K1" },
  ],
  Tuesday: [
    { start: "08:30", end: "09:55", slot: "E1" },
    { start: "10:00", end: "11:25", slot: "F1" },
    { start: "11:30", end: "12:25", slot: "D1" },
    { start: "14:00", end: "15:25", slot: "L1" },
    { start: "15:30", end: "16:55", slot: "L2" },
    { start: "17:00", end: "17:55", slot: "Q1" },
  ],
  Wednesday: [
    { start: "08:30", end: "09:25", slot: "D2" },
    { start: "09:30", end: "10:25", slot: "A2" },
    { start: "10:30", end: "11:25", slot: "B2" },
    { start: "11:30", end: "12:25", slot: "C2" },
    { start: "14:00", end: "14:55", slot: "J2" },
    { start: "15:00", end: "15:55", slot: "H2" },
    { start: "16:00", end: "16:55", slot: "I2" },
    { start: "17:00", end: "17:55", slot: "K2" },
  ],
  Thursday: [
    { start: "08:30", end: "09:55", slot: "F2" },
    { start: "10:00", end: "11:25", slot: "E2" },
    { start: "11:30", end: "12:25", slot: "S2" },
    { start: "14:00", end: "15:25", slot: "M1" },
    { start: "15:30", end: "16:55", slot: "M2" },
    { start: "17:00", end: "17:55", slot: "Q2" },
  ],
  Friday: [
    { start: "08:30", end: "09:25", slot: "C3" },
    { start: "09:30", end: "10:25", slot: "D3" },
    { start: "10:30", end: "11:25", slot: "A3" },
    { start: "11:30", end: "12:25", slot: "B3" },
    { start: "14:00", end: "14:55", slot: "I3" },
    { start: "15:00", end: "15:55", slot: "J3" },
    { start: "16:00", end: "16:55", slot: "H3" },
    { start: "17:00", end: "17:55", slot: "K3" },
  ],
};

export const allSlots = [
  "A1", "A2", "A3", 
  "B1", "B2", "B3",
  "C1", "C2", "C3",
  "D1", "D2", "D3",
  "E1", "E2",
  "F1", "F2",
  "S1", "S2",
  "H1", "H2", "H3",
  "I1", "I2", "I3",
  "J1", "J2", "J3",
  "K1", "K2", "K3",
  "L1", "L2",
  "M1", "M2",
  "Q1", "Q2"
].sort();
