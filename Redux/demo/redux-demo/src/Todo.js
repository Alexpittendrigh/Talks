import React from 'react';
import { map } from 'ramda';
import { connect } from 'react-redux';

import './App.css';


function TodoRenderer({
  year,
  month,
  day,
  todos
}) {
  return <ul>
    { map(renderTodo, todos[month][day]) }
    </ul>;
}

function renderTodo(todo) {
  return <li>{todo}</li>
}

const mapStateToProps = ({
  todo: { todos }
}) => ({
  todos
});

export const Todo = connect(mapStateToProps)(TodoRenderer);
