import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import App from './App';
import authReducer from './store/reducers/auth';
import patientReducer from './store/reducers/patient';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
 
// Note: this API requires redux@>=3.1.0
const rootReducer = combineReducers({
  auth: authReducer,
  pat: patientReducer,
});

const store = createStore(rootReducer,
  applyMiddleware(thunk)
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// ReactDOM.render(
//     // <App />,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bi
