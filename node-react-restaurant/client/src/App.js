import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Alert from './component/layout/Alert';
import Dashboard from './component/dashboard/Dashboard';
import PrivateRoute from './component/routing/PrivateRoute';
import CreateFood from './component/forms/CreateFood';



//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-food" component={CreateFood} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};
export default App;
