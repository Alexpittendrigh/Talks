import React from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import { map } from 'ramda';
import {
  addTodo,
  setTodoText,
  cancelCreateTodo
} from './actions.js';

import './App.css';

ModalRenderer.propTypes = {
  showCreateModal: PropTypes.bool.isRequired,
  todo: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  cancelCreateTodo: PropTypes.func.isRequired,
  day: PropTypes.number,
  month: PropTypes.number
}

function ModalRenderer({
  showCreateModal,
  todo,
  addTodo,
  cancelCreateTodo,
  setTodoText,
  day,
  month,
  showCurrentDayModal,
  todos
}) {
  console.log('current day', showCurrentDayModal, month, day);

  const newTodo = (<form>
  Todo: &nbsp;
  <input
  type='text'
  onChange={(event) => {
    setTodoText(event.target.value)
  }}
  value={todo}
  />
  </form>);

  const showAll = (<form>
    all: &nbsp;
    <input
      type='text'
      onChange={(event) => {
          setTodoText(event.target.value)
      }}
      value={todo}
    />
  </form>);
  const form = showCreateModal ? newTodo : showAllTodos(todos, month, day);
  const showModal = showCreateModal || showCurrentDayModal;
  const title = showCreateModal ? 'New Todo' : `Todos for 2018/${month}/${day}`;
  return (
    <div style={{display: (showModal ? 'block' : 'none')}}
    className={"modal fade " + (showModal ? "show" : "")}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            { form }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={addTodo}>
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={cancelCreateTodo}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTodo(todo) {
  return <li>{todo}</li>;
}

function showAllTodos(todos, month, day) {
  if (day == null) {
    return null;
  }
  return (<form>
    { map(renderTodo, todos[month][day]) }
  </form>);
}

const mapStateToProps = (state) => {
  const {
    todo: {
      todos,
      newTodo: {
        todo
      },
      currentDay: { day, month },
      showCurrentDayModal
    }
  } = state;
  return {
  todos,
  todo,
  day,
  month,
  showCurrentDayModal}
};

const mapDispatchToProps = (dispatch) => (bindActionCreators({
  addTodo,
  setTodoText,
  cancelCreateTodo
}, dispatch));

export const ModalFactory = connect(mapStateToProps, mapDispatchToProps)(ModalRenderer);
