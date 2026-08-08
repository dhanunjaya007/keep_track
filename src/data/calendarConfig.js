// All dates should be in YYYY-MM-DD format
export const calendarConfig = {
  termStartDate: "2026-08-03",
  termEndDate: "2026-11-18",
  
  exams: [
    { name: "Mid-Term Exams", start: "2026-09-21", end: "2026-09-26" },
    { name: "End-Semester Exams", start: "2026-11-21", end: "2026-11-27" }
  ],

  holidays: {
    "2026-01-14": "Makar Sankranti",
    "2026-01-26": "Republic Day",
    "2026-03-04": "Holi",
    "2026-03-19": "Chaitra Sukladi",
    "2026-03-21": "Id-Ul-Fitr",
    "2026-03-31": "Mahavir Jayanti",
    "2026-04-03": "Good Friday",
    "2026-04-14": "Ambedkar Jayanti",
    "2026-05-01": "Buddha Purnima",
    "2026-05-27": "Id-Ul-Zuha",
    "2026-06-26": "Muharram",
    "2026-08-15": "Independence Day",
    "2026-08-26": "Milad-Un-Nabi",
    "2026-09-14": "Ganesh Chaturthi",
    "2026-10-02": "Gandhi Jayanti",
    "2026-10-19": "Mahanavami",
    "2026-10-20": "Vijaya Dashami",
    "2026-11-01": "Karnataka Rajyotsava",
    "2026-11-08": "Naraka Chaturdashi",
    "2026-11-24": "Guru Nanak Jayanti",
    "2026-12-25": "Christmas Day"
  },

  // Dates where the timetable is swapped
  timetableSwaps: {
    "2026-11-17": "Friday" // Tuesday follows Friday timetable
  }
};
