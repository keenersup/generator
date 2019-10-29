import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import { AuthRoute, GuestRoute } from "./customRoute/AuthenticationRoute";
import { SideBar } from "./component/bodyWrapper/SideBar";

const Home = lazy(() => import("./route/Home"))
const Admin = lazy(() => import("./route/Admin"))
const Register = lazy(() => import("./route/Register"))
const Login = lazy(() => import("./route/Login"))

const ErrorPage = lazy(() => import("./route/ErrorPage"))

function App() {
  return (
    <Suspense fallback={<div />}>
      <Router>
        <SideBar>
        <Switch>
          <Route path='/' exact component={Home} />
          <AuthRoute path='/admin' exact component={Admin} />
          <GuestRoute path='/login' exact  component={Login} />
          <GuestRoute path='/register' exact  component={Register} />
          <Route path="*" component={ErrorPage} />
          <Redirect path="*" to='/' />
        </Switch>
        </SideBar>
      </Router>
    </Suspense>
  );
}

export default App;
