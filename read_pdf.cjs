const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('AcademicCalendar Autumn 2026-27.docx_0.pdf');

pdf.default(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    pdf(dataBuffer).then(function(data) {
        console.log(data.text);
    });
});
