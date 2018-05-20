import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers
} from 'redux';
import {
  Provider
} from 'react-redux';

import {
  todo
} from './reducers/todoReducer.js';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(combineReducers({
  todo
}))

ReactDOM.render(
  <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
