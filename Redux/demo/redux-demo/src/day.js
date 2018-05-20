import React from 'react';
import { append } from 'ramda';
import { connect } from 'react-redux';
import './App.css';

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function DayRenderer({ month, day, year, fromLastMonth }) {
  const currentDate = new Date(2018, month, day);
  return <div className={'day ' + (fromLastMonth ? 'prev-month' : '')}>
    <h2>{ days[currentDate.getDay()] }</h2>
    <h3>{ day} </h3>
    todo: 
  </div>;
}

const mapDispatchToProps = () => ({})

export const Day = connect(null, mapDispatchToProps)(DayRenderer);
