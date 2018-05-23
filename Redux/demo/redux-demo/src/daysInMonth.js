export function daysInMonth(date) {
  let currentDate = new Date(date.getYear(), date.getMonth(), date.getDay(), 0, 0, 0, 0);
  let currentMonth = currentDate.getMonth();
  let daysInMonth;
  for (daysInMonth = currentDate.getDate(); currentMonth === currentDate.getMonth(); daysInMonth++) {
    currentDate.setDate(daysInMonth);
  }
  return daysInMonth;
}
