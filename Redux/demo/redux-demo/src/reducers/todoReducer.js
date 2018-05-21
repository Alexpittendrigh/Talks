import { mergeDeepRight } from 'ramda';
import { daysInMonth } from '../daysInMonth.js';
import { addTodo } from '../actions.js';

const initialState = {
  todos: {},
  showCreateModal: false,
  newTodo: {
    day: null,
    month: null,
    year: null,
    todo: null
  }
};

for (let month = 0; month < 12; month++) {
  const todos = initialState.todos;
  const currentMonth = {};
  let currentDate = new Date((new Date().getYear()), month, 1, 0, 0, 0, 0);
  const daysInCurrentMonth = daysInMonth(currentDate);
  for (let currentDay = 1; currentDay <= daysInCurrentMonth - 1; currentDay++) {
    currentMonth[currentDay] = [];
  }
  todos[month] = currentMonth;
}

const actionHandlers = {};
actionHandlers[addTodo] = (state, { day, month, year }) => {
  return mergeDeepRight(state, {
    showCreateModal: true,
    newTodo: {
      day, month, year
    }
  });
};
// https://medium.freecodecamp.org/reducing-the-reducer-boilerplate-with-createreducer-86c46a47f3e2
export function todo(state = initialState, action) {
  if (actionHandlers.hasOwnProperty(action.type)){
    return actionHandlers[action.type](state, action);
  }

  return state;
}
