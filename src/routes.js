import React from 'react'
import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import { Home } from './pages/Home'
import { Question } from './pages/Question'

export const Routes = ({ user }) => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Home {...props} user={user}  />}
      />
      <Route
        exact
        path="/questions/:id"
        render={(props) => <Question {...props} user={user}  />}
      />
      <Route component={() => (<div>404</div>)} />
    </Switch>
  </BrowserRouter>
)