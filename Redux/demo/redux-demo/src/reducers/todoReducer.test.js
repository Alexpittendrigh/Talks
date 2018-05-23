import { todo } from './todoReducer.js';
import { showTodoModal } from '../actions.js';

it('shows the create todo modal for the given day', () => {
  const action = showTodoModal(24, 4, 2018);
  const newState = todo(undefined, action);
  expect(newState.newTodo).toEqual({
      day: 24,
      month: 4,
      year: 2018,
      todo: ''
  });
});
