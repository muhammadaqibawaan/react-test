import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import * as authActions from './store/actions/Auth';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

 useEffect(() => {
   dispatch(authActions.authCheckState());
 }, []);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/register' exact component={Register}></Route>
          <Route path='/login' exact component={Login}></Route>
          {isAuthenticated ? (
            <Route path='/dashboard' exact component={Dashboard}></Route>
          ) : (
            <Redirect to='/login' />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
