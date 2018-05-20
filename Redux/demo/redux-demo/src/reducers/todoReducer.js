// import { assoc } from 'ramda';
import { daysInMonth } from '../daysInMonth.js';

const initialState = {
  todos: {}
};

for (let month = 1; month <= 12; month++) {
  const todos = initialState.todos;
  const currentMonth = {};
  let currentDate = new Date((new Date().getYear()), month, 1, 0, 0, 0, 0);
  const daysInCurrentMonth = daysInMonth(currentDate);
  for (let currentDay = 1; currentDay <= daysInCurrentMonth - 1; currentDay++) {
    currentMonth[currentDay] = [];
  }
  todos[month] = currentMonth;
}

export function todo(state = initialState, action) {
  return state;
}
