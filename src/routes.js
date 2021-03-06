/* External Dependencies */
import React from 'react'
import { Router, Route, Link, browserHistory, useRouterHistory, hashHistory, IndexRoute, IndexRedirect } from 'react-router'
import { createHashHistory } from 'history'

/* Intenral Dependencies */
import App$ from './containers/App$'
import Welcome$ from './containers/Welcome$'
import Messages$ from './containers/Messages$'
import MainFrame from './components/MainFrame'
import PostMessage$ from './containers/PostMessage$'
import { RouteUtils } from './utils'


/************************************************************
 * Redux
 ************************************************************/
import { ReduxUtils } from './utils'
import { Provider } from 'react-redux'
const store = ReduxUtils.store()


/************************************************************
 * Router renders here
 ************************************************************/

export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App$}>
        <IndexRedirect to="welcome"/>
        <Route path="welcome" component={Welcome$}/>
        <Route
          component={MainFrame}
          onEnter={RouteUtils.geoCheck}>
          <Route path="messages" component={Messages$}/>
          <Route path="postMessage" component={PostMessage$}/>
        </Route>
      </Route>
    </Router>
  </Provider>
)


