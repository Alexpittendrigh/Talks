import React from 'react';
import PropTypes from 'prop-types';
import {
  map
} from 'ramda';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import {
  addTodo
} from './actions.js';

import './App.css';

function ModalRenderer({
  show
}) {
  return <div
          className={"modal fade " + (show ? 'show' : '')}
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
          </div>;
}

const mapStateToProps = ({
  todo: {
    todos
  }
}) => ({
  todos
});

const mapDispatchToProps = (dispatch) => (bindActionCreators({
  addTodo
}, dispatch));

export const ModalFactory = connect(mapStateToProps)(ModalRenderer);
