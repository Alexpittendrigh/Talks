import React from 'react';
import { append, forEachObjIndexed } from 'ramda';
import { connect } from 'react-redux';

import './App.css';
import {
  getMonthName
} from './getMonthName.js';
import { Day } from './day.js'

function MonthRenderer({
  month,
  todos
}) {
  return <div>
    <h1>
      { getMonthName(month) }
    </h1>
    { renderDays(month, todos) }
  </div>;
}

function renderDays(month, todos) {
  let days = [];
  forEachObjIndexed((todos, day) => {
    days = append(<Day key={`${month}/${day}`} todos={todos} month={month} day={day} />, days);
  }, todos[month]);
  return days;
}

const mapStateToProps = ({
  todo: { todos }
}) => ({
  todos
});

export const Month = connect(mapStateToProps)(MonthRenderer);
