import React from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import {
  addTodo,
  setTodoText,
  closeModals,
  toggleTodo
} from './actions.js';

import './App.css';

ModalRenderer.propTypes = {
  showCreateModal: PropTypes.bool.isRequired,
  todo: PropTypes.string.isRequired,
  addTodo: PropTypes.func.isRequired,
  day: PropTypes.number,
  month: PropTypes.number
}

function ModalRenderer({
  showCreateModal,
  todo,
  addTodo,
  closeModals,
  setTodoText,
  day,
  month,
  showCurrentDayModal,
  todos,
  toggleTodo
}) {

  const newTodo = (<form onSubmit={(event) => {
    event.preventDefault();
    addTodo();
    }}>
    Todo: &nbsp;
    <input
    type='text'
    onChange={(event) => {
    setTodoText(event.target.value)
    }}
    value={todo}
    />
  </form>);

  const form = showCreateModal ? newTodo : showAllTodos(todos, month, day, toggleTodo);
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
            { showCreateModal &&
            <button type="button" className="btn btn-primary" onClick={addTodo}>
              Save
            </button>
            }
            <button type="button" className="btn btn-secondary" onClick={closeModals}>
              { showCurrentDayModal ? 'OK' : 'Cancel' }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTodo(todo, month, day, index, toggleTodo) {
  return (<div
            key={`${month}-${day}-${index}`}
            class="custom-control custom-checkbox">
    <input
      onClick={() => {
          toggleTodo(month, day, 0, index);
      }}
      checked={todo.done}
      type="checkbox"
      className="custom-control-input"
      id={`customCheck${index}`} />
    <label className="custom-control-label" htmlFor={`customCheck${index}`}>{todo.todo}</label>
  </div>);
}

function showAllTodos(todos, month, day, toggleTodo) {
  if (day == null) {
    return null;
  }
  return (<form>
    { todos[month][day].map((todo, index) => (renderTodo(todo, month, day, index, toggleTodo))) }
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
  closeModals,
  toggleTodo
}, dispatch));

export const ModalFactory = connect(mapStateToProps, mapDispatchToProps)(ModalRenderer);
