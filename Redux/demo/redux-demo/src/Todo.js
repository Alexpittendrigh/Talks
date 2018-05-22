import React from 'react';
import PropTypes from 'prop-types';
import {
  reduce
} from 'ramda';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import {
  showTodoModal,
  showTodos
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
  past,
  showTodos
}) {
  const todo = reduce(reduceTodos, {done: 0, todo: 0}, todos[month][day]);
  return (
    <div className='click-able'  onClick={() => { showTodos(month, day)}}>
    { renderAddTodoButton(past, showTodoModal, day, month, year) }
    <br/>
    Done: { todo.done }
    <br />
    Todo: { todo.todo }
    </div>
  );
}

function renderAddTodoButton(past, showTodoModal, day, month, year) {
  if (past) {
    return null;
  }
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModalCenter"
      onClick={() => {
        showTodoModal(day, month, year)
      }}
    >
    New Todo
  </button>);
}

function reduceTodos(accumulator, todo) {
  return {
    done: accumulator.done += (todo.done ? 1 : 0),
    todo: accumulator.todo += (!todo.done ? 1 : 0)
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
  showTodoModal,
  showTodos
}, dispatch))

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TodoRenderer);
