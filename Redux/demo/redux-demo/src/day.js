import React from 'react';
import { append } from 'ramda';
import { connect } from 'react-redux';
import './App.css';

const mapStateToProps = ({ todo }) => ({ todo });

function DayRenderer() {
    return <div>
        <h2>Monday</h2>
        todo: 
        </div>;
}

export const Day = connect(mapStateToProps)(DayRenderer);
