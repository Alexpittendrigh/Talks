import { mergeDeepRight, assocPath } from 'ramda';
import { daysInMonth } from '../daysInMonth.js';
import {
  SHOW_CREATE_TODO_MODAL,
  SET_TEXT,
  ADD_TODO,
  CANCEL_CREATE_TODO
} from '../actions.js';

const initialState = {
  todos: {},
  showCreateModal: false,
  newTodo: {
    day: null,
    month: null,
    year: null,
    todo: ''
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
actionHandlers[SHOW_CREATE_TODO_MODAL] = (state, { day, month, year }) => {
  return mergeDeepRight(state, {
    showCreateModal: true,
    newTodo: {
      day, month, year
    }
  });
};

actionHandlers[SET_TEXT] = (state, { text }) => {
  console.log('*** setting the text!', text);
  return assocPath([ 'newTodo', 'todo' ], text, state);
};

actionHandlers[ADD_TODO] = (state) => {
  const { day, month, todo } = state.newTodo;
  const changes = {
    newTodo: initialState.newTodo,
    showCreateModal: false
  };
  changes[month][day] = todo;
  return mergeDeepRight(state, changes);
};

actionHandlers[CANCEL_CREATE_TODO] = (state) => {
  return mergeDeepRight(state, {
    newTodo: initialState.newTodo,
    showCreateModal: false
  });
};

// https://medium.freecodecamp.org/reducing-the-reducer-boilerplate-with-createreducer-86c46a47f3e2
export function todo(state = initialState, action) {
  if (actionHandlers[action.type]){
    return actionHandlers[action.type](state, action);
  }

  return state;
}
