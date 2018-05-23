export const SHOW_CREATE_TODO_MODAL = 'SHOW_CREATE_TODO_MODAL';

//Actions are plain JavaScript objects.
export const ADD_TODO = 'ADD_TODO';
export const addTodo = () => ({
  type: ADD_TODO
});

export const showTodoModal = (day, month, year) => ({
  type: SHOW_CREATE_TODO_MODAL,
  day,
  month,
  year
});

export const SET_TEXT = 'SET_TEXT';
export const setTodoText = (text) => ({
  type: SET_TEXT,
  text
});
export const CLOSE_MODALS = 'CLOSE_MODALS';
export const closeModals = () => ({
  type: CLOSE_MODALS
});
export const SHOW_TODOS = 'SHOW_TODOS';
export const showTodos = (month, day) => ({
  type: SHOW_TODOS,
  day,
  month
});
