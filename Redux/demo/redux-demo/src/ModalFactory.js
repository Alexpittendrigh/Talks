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
  closeModals,
  toggleTodo
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
  closeModals,
  setTodoText,
  day,
  month,
  showCurrentDayModal,
  todos,
  toggleTodo
}) {

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
            <button type="button" className="btn btn-primary" onClick={addTodo}>
              Save
            </button>
            <button type="button" className="btn btn-secondary" onClick={closeModals}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTodo(todo, month, day, index, toggleTodo) {
  return (<div class="custom-control custom-checkbox">
    <input
      onClick={() => {
          toggleTodo(month, day, 0, index);
      }}
      checked={todo.done}
      type="checkbox"
      class="custom-control-input"
      id="customCheck1" />
    <label class="custom-control-label" for="customCheck1">{todo.todo}</label>
  </div>);
  {/* return <li key={`${month}-${day}-${index}`}> {todo}</li>; */}
}

function showAllTodos(todos, month, day, toggleTodo) {
  if (day == null) {
    return null;
  }
  let todoIndex = 0;
  return (<form>
    { map((todo) => (renderTodo(todo, month, day, todoIndex++, toggleTodo)), todos[month][day]) }
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
