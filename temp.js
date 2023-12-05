// Input string
const timeString = "11AM";

// Extract hours and minutes
const [hours, minutes] = timeString.match(/\d+/g).map(Number);

// Create a new Date object with a fixed date (e.g., January 1, 1970)
const date = new Date(1970, 0, 11, 13, 23);
const newDate = new Date('1970-01-01T18:53:00.000Z')
console.log(newDate.getHours())
console.log(newDate.getMinutes())
console.log(date);
