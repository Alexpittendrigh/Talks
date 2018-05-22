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
  showCurrentDayModal
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
  const form = showCreateModal ? newTodo : showAll;
  const showModal = showCreateModal || showCurrentDayModal;
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
            <h5 className="modal-title" id="exampleModalLongTitle">New Todo</h5>
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
