import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { daysInMonth } from './daysInMonth.js';
import { getMonthName } from './getMonthName.js';
import { Month } from './Month.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Redux Stuff
        </header>
        <div className='calendar'>
          <Month month={new Date().getMonth()} year={2018} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ todo }) => ({ todo });

export default connect(mapStateToProps)(App);
