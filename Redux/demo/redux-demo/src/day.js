import React from 'react';
import PropTypes from 'prop-types';
import { append } from 'ramda';
import { connect } from 'react-redux';
import './App.css';
import { Todo } from './Todo.js';

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

DayRenderer.propTypes = {
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  allTodos: PropTypes.array.isRequired
}

function DayRenderer({ month, day, year, fromLastMonth }) {
  const currentDate = new Date(2018, month, day);
  const isWeekendDate = currentDate.getDay() === 0 || currentDate.getDay() === 6;
  let classNames = 'day';
  if (fromLastMonth) {
    classNames += ' prev-month';
  }
  if (isWeekendDate) {
   classNames += ' weekend';
  }
  return <div className={classNames}>
    <h2>{ days[currentDate.getDay()] }</h2>
    <h3>{ day} </h3>
    <Todo year={year} month={month} day={day} />
  </div>;
}

const mapDispatchToProps = () => ({})

export const Day = connect(null, mapDispatchToProps)(DayRenderer);
