const ADD_TODO = 'ADD_TODO';
//Actions are plain JavaScript objects.
export const addTodo = (day, month, year) => ({
  type: ADD_TODO,
  day,
  month,
  year
});
