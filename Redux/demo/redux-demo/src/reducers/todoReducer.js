import { mergeDeepRight, path, assocPath, compose, append, assoc } from 'ramda';
import { daysInMonth } from '../daysInMonth.js';
import {
  SHOW_CREATE_TODO_MODAL,
  SET_TEXT,
  ADD_TODO,
  CLOSE_MODALS,
  SHOW_TODOS
} from '../actions.js';

const initialState = {
  todos: {},
  showCreateModal: false,
  showCurrentDayModal: false,
  newTodo: {
    day: null,
    month: null,
    year: null,
    todo: ''
  },
  currentDay: {
    day: null,
    month: null
  }
};

for (let month = 0; month < 12; month++) {
  const todos = initialState.todos;
  const currentMonth = {};
  let currentDate = new Date((new Date().getYear()), month, 0, 0, 0, 0, 0);
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
  return assocPath([ 'newTodo', 'todo' ], text, state);
};

actionHandlers[ADD_TODO] = (state) => {
  const { day, month, todo } = state.newTodo;
  return compose(
    assoc('showCreateModal', false),
    (newState) => (mergeDeepRight(newState, { newTodo: initialState.newTodo })),
    assocPath(['todos', month, day], append(todo, path(['todos', month, day], state)))
    )(state);
};

actionHandlers[CLOSE_MODALS] = (state) => {
  return mergeDeepRight(state, {
    newTodo: initialState.newTodo,
    showCreateModal: false,
    showCurrentDayModal: false,
    currentDay: initialState.currentDay
  });
};

actionHandlers[SHOW_TODOS] = (state, { day, month }) => {
  if (state.showCreateModal) {
    return state;
  }
  return mergeDeepRight(state, {
    showCurrentDayModal: true,
    currentDay: {
      day,
      month
    }
  });
};

// https://medium.freecodecamp.org/reducing-the-reducer-boilerplate-with-createreducer-86c46a47f3e2
export function todo(state = initialState, action) {
  if (actionHandlers[action.type]){
    return actionHandlers[action.type](state, action);
  }

  return state;
}
