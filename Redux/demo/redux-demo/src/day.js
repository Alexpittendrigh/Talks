import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import { Todo } from './Todo.js';

DayRenderer.propTypes = {
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired
}

function DayRenderer({ month, day, year, fromLastMonth }) {
  const now = new Date();
  const thisDate = new Date(2018, month, day);
  const isWeekendDate = thisDate.getDay() === 0 || thisDate.getDay() === 6;
  let classNames = 'day';
  if (fromLastMonth) {
    classNames += ' prev-month';
  }
  if (isWeekendDate) {
   classNames += ' weekend';
  }
  return <div className={classNames}>
    <h3>{ day } </h3>
    <Todo year={year} month={month} day={day} past={now < thisDate}/>
  </div>;
}

const mapDispatchToProps = () => ({})

export const Day = connect(null, mapDispatchToProps)(DayRenderer);
