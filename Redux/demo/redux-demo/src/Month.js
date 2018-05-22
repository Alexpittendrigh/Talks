import React from 'react';
import { append, forEachObjIndexed } from 'ramda';
import { connect } from 'react-redux';

import './App.css';
import {
  getMonthName
} from './getMonthName.js';
import { Day } from './day.js'

function MonthRenderer({
  year,
  month,
  todos
}) {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekDayOfMonth = firstDayOfMonth.getDay();
  const daysFromLastMonth = [];
  if (firstWeekDayOfMonth > 1) {
    var d = new Date(year, month, 1);
    for (let daysPast = 1; daysPast <= firstWeekDayOfMonth - 1; daysPast++) {
      d.setDate(d.getDate() - 1);
      daysFromLastMonth.push(<Day key={`${month-1}/${d.getDate()}`} month={month-1} day={d.getDate()} year={year} fromLastMonth />);
    }
  }

  return <div>
    <h1>
      { getMonthName(month) } { year }
    </h1>
    <div className='day heading'><h2>Monday</h2></div>
         <div className='day heading'><h2>Tuesday</h2></div>
         <div className='day heading'><h2>Wednesday</h2></div>
         <div className='day heading'><h2>Thursday</h2></div>
         <div className='day heading'><h2>Friday</h2></div>
         <div className='day heading'><h2>Saturday</h2></div>
         <div className='day heading'><h2>Sunday</h2></div>
         { [ ...daysFromLastMonth, ...renderDays(year, month, todos) ] }
  </div>;
}

function renderDays(year, month, todos) {
  let days = [];
  forEachObjIndexed((todos, day) => {
    days = append(<Day
                    key={`${month}/${day}`}
                    todos={todos}
                    month={month}
                    day={Number.parseInt(day, 10)}
                    year={year} />,
                  days);
  }, todos[month]);
  return days;
}

const mapStoreToProps = ({
  todo: { todos }
}) => ({
  todos
});

export const Month = connect(mapStoreToProps)(MonthRenderer);
