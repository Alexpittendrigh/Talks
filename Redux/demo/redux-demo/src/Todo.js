import React from 'react';
import PropTypes from 'prop-types';
import {
  map
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
  todos: PropTypes.object.isRequired
}

function TodoRenderer({
  year,
  month,
  day,
  todos,
  showTodoModal
}) {
  return (
    <div>
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
      </button>
      <ul>
        { map(renderTodo, todos[month][day]) }
      </ul>
    </div>
  );
}

function renderTodo(todo) {
  return <li>{todo}</li>
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
