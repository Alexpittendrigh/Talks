import React from 'react';
import PropTypes from 'prop-types';
import {
  map,
  reduce
} from 'ramda';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import {
  showTodoModal
} from './actions.js';

import './App.css';

TodoRenderer.propTypes = {
  showTodoModal: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  todos: PropTypes.object.isRequired,
  past: PropTypes.bool.isRequired
}

function TodoRenderer({
  year,
  month,
  day,
  todos,
  showTodoModal,
  past
}) {
  const todo = reduce(reduceTodos, {done: 0, todo: 0}, todos[month][day]);
  return (
    <div>
    { past && 
    <button
    type="button"
    className="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModalCenter"
    onClick={() => {
      showTodoModal(day, month, year)}
    }
    >
    New Todo
    </button> }
    <br/>
    Done: { todo.done }
    <br />
    Todo: { todo.todo }
    </div>
  );
}

function renderTodo(todo) {
  return <li>{todo}</li>
}

function reduceTodos(accumulator, todo) {
  return {
    done: accumulator.done += (todo.done ? 1 : 0),
    todo: accumulator.done += (!todo.done ? 0 : 1)
  }
}

const mapStateToProps = ({
  todo: {
    todos
  }
}) => ({
  todos
});

const mapDispatchToProps = (dispatch) => (bindActionCreators({
  showTodoModal
}, dispatch))

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoRenderer);
