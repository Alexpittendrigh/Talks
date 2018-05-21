import React from 'react';
import { append } from 'ramda';
import { connect } from 'react-redux';
import './App.css';

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
    todo: 
  </div>;
}

const mapDispatchToProps = () => ({})

export const Day = connect(null, mapDispatchToProps)(DayRenderer);
