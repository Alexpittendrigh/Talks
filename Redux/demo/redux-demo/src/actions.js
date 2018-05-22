export const SHOW_CREATE_TODO_MODAL = 'SHOW_CREATE_TODO_MODAL';
//Actions are plain JavaScript objects.
export const showTodoModal = (day, month, year) => ({
  type: SHOW_CREATE_TODO_MODAL,
  day,
  month,
  year
});

export const ADD_TODO = 'ADD_TODO';
export const addTodo = () => ({
  type: ADD_TODO
});
export const SET_TEXT = 'SET_TEXT';
export const setTodoText = (text) => ({
  type: SET_TEXT,
  text
});
export const CANCEL_CREATE_TODO = 'CANCEL_CREATE_TODO';
export const cancelCreateTodo = () => ({
  type: CANCEL_CREATE_TODO
});
