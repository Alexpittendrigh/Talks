import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './App.css';
import { daysInMonth } from './daysInMonth.js';
import { getMonthName } from './getMonthName.js';
import { Month } from './Month.js';
import { ModalFactory } from './ModalFactory.js';

class App extends Component {
  render() {
    const { showCreateModal } = this.props;
    return (
      <div className="App">
        <ModalFactory show={showCreateModal} />
        <div className='calendar'>
          <Month month={new Date().getMonth()} year={2018} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ todo: { showCreateModal }}) => ({ showCreateModal });

export default connect(mapStateToProps)(App);
