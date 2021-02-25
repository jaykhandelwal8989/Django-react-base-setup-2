import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './main.js';
import App from './App';
import authReducer from './Store/Reducers/Auth';
import * as actions from './Store/Actions/Auth';

import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
  const rootReducer = combineReducers({
      auth: authReducer,
  });

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  return store;
}

const store = configureStore()
store.dispatch(actions.authCheckState());

const app = (
    <Router>
        <Provider store={store}>
            <App/>
       </Provider>
    </Router>

)

ReactDOM.render(app,document.getElementById('root'));

