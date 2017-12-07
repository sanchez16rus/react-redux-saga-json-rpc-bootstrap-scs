import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../components/Login';
import Houses from '../components/Houses';

const RootRouting = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Houses}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

export default RootRouting