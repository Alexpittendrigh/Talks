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
  addTodo
} from './actions.js';

import './App.css';

TodoRenderer.propTypes = {
  addTodo: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  todo: PropTypes.array.isRequired
}

function TodoRenderer({
  year,
  month,
  day,
  todos,
  addTodo
}) {
  return (
    <div>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
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
  addTodo
}, dispatch))

export const Todo = connect(mapStateToProps)(TodoRenderer);
